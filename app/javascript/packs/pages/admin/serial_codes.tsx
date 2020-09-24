import classnames from "classnames";
import { format } from "date-fns";
import React, { useState, useEffect, useCallback } from "react";
import { Header } from "../../../components/Header";
import { Page } from "../../../components/Page";
import { Table, Tbody, Td, Th, Thead, Tr } from "../../../components/Table";
import axios from "../../../utils/axios";
import { render } from "../../../utils/render";

// Helper Functions

const getSerialCodes = () =>
  axios
    .get<{ data: SerialCode[] }>("/admin/serial_codes")
    .then(({ data }) => data);

const createSerialCode = () =>
  axios
    .post<{ data: SerialCode }>("/admin/serial_codes", {
      [document
        .querySelector("meta[name='csrf-param']")!
        .getAttribute("content")!]: document
        .querySelector("meta[name='csrf-token']")!
        .getAttribute("content")!,
    })
    .then(({ data }) => data);

const updateSerialCode = (
  id: number,
  state: SerialCode["state"]
): Promise<{ data: SerialCode }> =>
  axios
    .put<{ data: SerialCode }>(`/admin/serial_codes/${id}`, {
      state,
      [document
        .querySelector("meta[name='csrf-param']")!
        .getAttribute("content")!]: document
        .querySelector("meta[name='csrf-token']")!
        .getAttribute("content")!,
    })
    .then(({ data }) => data);

const removeSerialCode = (id: number) =>
  axios
    .delete<{ data: SerialCode }>(`/admin/serial_codes/${id}`, {
      params: {
        [document
          .querySelector("meta[name='csrf-param']")!
          .getAttribute("content")!]: document
          .querySelector("meta[name='csrf-token']")!
          .getAttribute("content")!,
      },
    })
    .then(({ data }) => data);

const formatSerialCode = (serialCode: string) => {
  if (serialCode.length !== 16) {
    return serialCode;
  }

  return [...serialCode.matchAll(/\w{4}/g)].map((s) => s[0]).join("-");
};

const getNextOrder = (
  nextKey: SerialCodeSortInformation["key"],
  currentSortInformation?: SerialCodeSortInformation
): SerialCodeSortInformation["order"] => {
  if (!currentSortInformation || currentSortInformation.key !== nextKey) {
    return "asc";
  }

  return currentSortInformation.order === "asc" ? "desc" : "asc";
};

const sortBySortInformation = (
  serialCodes: SerialCode[],
  sortInformation: SerialCodeSortInformation
) => {
  const { key, order } = sortInformation;

  if (key === "id") {
    return order === "asc"
      ? serialCodes!.sort((x, y) => (x.id < y.id ? -1 : 1))
      : serialCodes!.sort((x, y) => (x.id > y.id ? -1 : 1));
  }

  if (key === "state") {
    return order === "asc"
      ? [
          ...serialCodes!.filter(({ state }) => state === "created"),
          ...serialCodes!.filter(({ state }) => state === "allowed"),
          ...serialCodes!.filter(({ state }) => state === "denied"),
        ]
      : [
          ...serialCodes!.filter(({ state }) => state === "denied"),
          ...serialCodes!.filter(({ state }) => state === "allowed"),
          ...serialCodes!.filter(({ state }) => state === "created"),
        ];
  }

  if (key === "created_at") {
    return order === "asc"
      ? serialCodes!.sort((x, y) => (x.created_at < y.created_at ? -1 : 1))
      : serialCodes!.sort((x, y) => (x.created_at < y.created_at ? 1 : -1));
  }

  if (key === "updated_at") {
    return order === "asc"
      ? serialCodes!.sort((x, y) => (x.updated_at < y.updated_at ? -1 : 1))
      : serialCodes!.sort((x, y) => (x.updated_at < y.updated_at ? 1 : -1));
  }
};

// Components

const ColumnTitle: React.FC<{
  onClick?: () => void;
  asc?: boolean;
  desc?: boolean;
}> = ({ asc = false, children, desc = false, onClick }) => (
  <Th>
    <div
      className={`flex items-center ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      {children}
      {onClick && (
        <svg
          className="ml-auto fill-current"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5 5.33333C12.5 5.51389 12.432 5.67014 12.2959 5.80208C12.1598 5.93403 11.9987 6 11.8125 6H2.1875C2.0013 6 1.84017 5.93403 1.7041 5.80208C1.56803 5.67014 1.5 5.51389 1.5 5.33333C1.5 5.15278 1.56803 4.99653 1.7041 4.86458L6.5166 0.197917C6.65267 0.0659722 6.8138 0 7 0C7.1862 0 7.34733 0.0659722 7.4834 0.197917L12.2959 4.86458C12.432 4.99653 12.5 5.15278 12.5 5.33333Z"
            className={asc ? "" : "text-gray-400"}
          />
          <path
            d="M12.5 8.66667C12.5 8.84722 12.432 9.00347 12.2959 9.13542L7.4834 13.8021C7.34733 13.934 7.1862 14 7 14C6.8138 14 6.65267 13.934 6.5166 13.8021L1.7041 9.13542C1.56803 9.00347 1.5 8.84722 1.5 8.66667C1.5 8.48611 1.56803 8.32986 1.7041 8.19792C1.84017 8.06597 2.0013 8 2.1875 8H11.8125C11.9987 8 12.1598 8.06597 12.2959 8.19792C12.432 8.32986 12.5 8.48611 12.5 8.66667Z"
            className={desc ? "" : "text-gray-400"}
          />
        </svg>
      )}
    </div>
  </Th>
);

// Types

type SerialCode = {
  id: number;
  serial_code: string;
  state: "created" | "allowed" | "denied";
  created_at: string;
  updated_at: string;
};

type SerialCodeSortInformation = {
  key: keyof SerialCode;
  order: "asc" | "desc";
};

const SerialCodes: React.FC = () => {
  const [serialCodes, setSerialCodes] = useState<SerialCode[]>();
  const [sortInformation, setSortInformation] = useState<
    SerialCodeSortInformation
  >({ key: "created_at", order: "asc" });

  const sortById = useCallback(() => {
    setSerialCodes(
      sortBySortInformation(serialCodes!, {
        key: "id",
        order: getNextOrder("id", sortInformation),
      })
    );

    setSortInformation({
      key: "id",
      order: getNextOrder("id", sortInformation),
    });
  }, [serialCodes, sortInformation]);

  const sortByState = useCallback(() => {
    setSerialCodes(
      sortBySortInformation(serialCodes!, {
        key: "state",
        order: getNextOrder("state", sortInformation),
      })
    );

    setSortInformation({
      key: "state",
      order: getNextOrder("state", sortInformation),
    });
  }, [serialCodes, sortInformation]);

  const sortByCreatedAt = useCallback(() => {
    sortBySortInformation(serialCodes!, {
      key: "created_at",
      order: getNextOrder("created_at", sortInformation),
    });

    setSortInformation({
      key: "created_at",
      order: getNextOrder("created_at", sortInformation),
    });
  }, [serialCodes, sortInformation]);

  const sortByUpdatedAt = useCallback(() => {
    sortBySortInformation(serialCodes!, {
      key: "updated_at",
      order: getNextOrder("updated_at", sortInformation),
    });

    setSortInformation({
      key: "updated_at",
      order: getNextOrder("updated_at", sortInformation),
    });
  }, [serialCodes, sortInformation]);

  const handleOnClickCreateSerialCode = useCallback(async () => {
    const { data } = await createSerialCode();
    setSerialCodes(
      sortBySortInformation([...serialCodes, data], sortInformation)
    );
  }, [serialCodes, sortInformation]);

  const handleOnClickUpdateState = useCallback(
    async (id: number, state: SerialCode["state"]) => {
      const { data } = await updateSerialCode(id, state);

      const i = serialCodes!.findIndex((s) => s.id === id);
      serialCodes![i] = data;

      setSerialCodes(sortBySortInformation([...serialCodes], sortInformation));
    },
    [serialCodes, sortInformation]
  );

  const handleOnClickRemoveSerialCode = useCallback(
    async (id: number) => {
      await removeSerialCode(id);
      setSerialCodes(
        sortBySortInformation(
          serialCodes!.filter((s) => s.id !== id),
          sortInformation
        )
      );
    },
    [serialCodes, sortInformation]
  );

  useEffect(() => {
    (async () => {
      const { data } = await getSerialCodes();

      setSerialCodes(data);
    })();
  }, []);

  if (!serialCodes) {
    return <div>Loading</div>;
  }

  const { key, order } = sortInformation;

  return (
    <Page>
      <div className="flex">
        <Header>シリアルコード</Header>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
          onClick={handleOnClickCreateSerialCode}
        >
          作成する
        </button>
      </div>
      <div className="shadow rounded mt-8">
        <Table>
          <Thead>
            <Tr>
              <ColumnTitle
                asc={key === "id" && order === "asc"}
                desc={key === "id" && order === "desc"}
                onClick={sortById}
              >
                ID
              </ColumnTitle>
              <ColumnTitle>シリアルコード</ColumnTitle>
              <ColumnTitle
                asc={key === "state" && order === "asc"}
                desc={key === "state" && order === "desc"}
                onClick={sortByState}
              >
                公開状態
              </ColumnTitle>
              <ColumnTitle
                asc={key === "created_at" && order === "asc"}
                desc={key === "created_at" && order === "desc"}
                onClick={sortByCreatedAt}
              >
                作成日時
              </ColumnTitle>
              <ColumnTitle
                asc={key === "updated_at" && order === "asc"}
                desc={key === "updated_at" && order === "desc"}
                onClick={sortByUpdatedAt}
              >
                最終更新日
              </ColumnTitle>
              <ColumnTitle />
            </Tr>
          </Thead>
          <Tbody>
            {serialCodes.map((serialCode) => (
              <Tr key={serialCode.id}>
                <Td>
                  <p className="text-gray-900 whitespace-no-wrap">
                    {serialCode.id}
                  </p>
                </Td>
                <Td>
                  <p className="text-gray-900 whitespace-no-wrap">
                    {formatSerialCode(serialCode.serial_code)}
                  </p>
                </Td>
                <Td>
                  <span
                    className={classnames(
                      "relative inline-block px-3 py-1 font-semibold leading-tight",
                      {
                        "text-blue-900": serialCode.state === "created",
                        "text-green-900": serialCode.state === "allowed",
                        "text-orange-900": serialCode.state === "denied",
                      }
                    )}
                  >
                    <span
                      aria-hidden
                      className={classnames(
                        "absolute inset-0 opacity-50 rounded-full",
                        {
                          "bg-blue-200": serialCode.state === "created",
                          "bg-green-200": serialCode.state === "allowed",
                          "bg-orange-200": serialCode.state === "denied",
                        }
                      )}
                    ></span>
                    <span className="capitalize relative">
                      {serialCode.state}
                    </span>
                  </span>
                </Td>
                <Td>
                  <p className="text-gray-900 whitespace-no-wrap">
                    {format(
                      new Date(serialCode.created_at),
                      "yyyy/MM/dd hh:mm"
                    )}
                  </p>
                </Td>
                <Td>
                  <p className="text-gray-900 whitespace-no-wrap">
                    {format(
                      new Date(serialCode.updated_at),
                      "yyyy/MM/dd hh:mm"
                    )}
                  </p>
                </Td>
                <Td className="flex justify-end">
                  <button
                    className={classnames(
                      "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2",
                      {
                        "opacity-25 cursor-not-allowed":
                          serialCode.state === "allowed",
                      }
                    )}
                    onClick={
                      serialCode.state === "created" ||
                      serialCode.state === "denied"
                        ? () =>
                            handleOnClickUpdateState(serialCode.id, "allowed")
                        : undefined
                    }
                  >
                    許可
                  </button>
                  <button
                    className={classnames(
                      "bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mr-2",
                      {
                        "opacity-25 cursor-not-allowed":
                          serialCode.state === "denied",
                      }
                    )}
                    onClick={
                      serialCode.state === "created" ||
                      serialCode.state === "allowed"
                        ? () =>
                            handleOnClickUpdateState(serialCode.id, "denied")
                        : undefined
                    }
                  >
                    拒否
                  </button>
                  <button
                    className={classnames(
                      "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded",
                      {
                        "opacity-25 cursor-not-allowed":
                          serialCode.state !== "created",
                      }
                    )}
                    onClick={
                      serialCode.state === "created"
                        ? () => handleOnClickRemoveSerialCode(serialCode.id)
                        : undefined
                    }
                  >
                    削除
                  </button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </Page>
  );
};

render(SerialCodes);
