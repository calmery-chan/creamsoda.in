import React from "react";
import styled from "styled-components";
import useSWR from "swr";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { WorksResponse } from "../../../types/contentful";
import { getWorks } from "../../../utils/contentful";
import { render } from "../../../utils/render";

const Work = styled.div`
  background: rgba(245, 245, 245, 1);
  margin: 24px;
  padding: 24px;
`;

const WorkTitle = styled.h1`
  margin: 0;
`;

const WorkSubTitle = styled.h2`
  margin: 0;
  margin-top: 16px;
`;

const WorkContent = styled.div`
  margin-top: 8px;
`;

const WorkThumbnail = styled.img`
  height: 300px;
  margin-right: 8px;
`;

const WorkDescription = styled.div`
  background: #fff;
  border: 1px solid rgba(200, 200, 200, 1);
  border-radius: 4px;
  padding: 16px;

  h2,
  p {
    margin: 0;
  }
`;

const WorkList: React.FC = () => {
  const { data, error } = useSWR<WorksResponse>(
    "/admin/contentful/works",
    getWorks
  );

  if (error) {
    return <div>Error</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {data.data.works.map(({ title, description, thumbnails, model }, key) => (
        <Work key={key}>
          <WorkTitle>{title}</WorkTitle>
          <WorkSubTitle>Description</WorkSubTitle>
          <WorkContent>
            <WorkDescription
              dangerouslySetInnerHTML={{
                __html: documentToHtmlString(description),
              }}
            />
          </WorkContent>
          <WorkSubTitle>Thumbnails</WorkSubTitle>
          <WorkContent>
            {thumbnails.map(({ url }, key) => (
              <WorkThumbnail src={url} key={key} />
            ))}
          </WorkContent>
          <WorkSubTitle>3D Model</WorkSubTitle>
          <WorkContent>
            <a href={model.url} download>
              Download ({model.file_size / (1000 * 1000)}MB)
            </a>
          </WorkContent>
          <WorkSubTitle>Position</WorkSubTitle>
          <WorkContent>
            <ul>
              <li>X: {model.position_x}</li>
              <li>Y: {model.position_y}</li>
              <li>Z: {model.position_z}</li>
            </ul>
          </WorkContent>
          <WorkSubTitle>Rotate</WorkSubTitle>
          <WorkContent>
            <ul>
              <li>X: {model.rotate_x}</li>
              <li>Y: {model.rotate_y}</li>
              <li>Z: {model.rotate_z}</li>
            </ul>
          </WorkContent>
          <WorkSubTitle>Scale</WorkSubTitle>
          <WorkContent>
            <ul>
              <li>X: {model.scale_x}</li>
              <li>Y: {model.scale_y}</li>
              <li>Z: {model.scale_z}</li>
            </ul>
          </WorkContent>
        </Work>
      ))}
    </>
  );
};

render(WorkList);
