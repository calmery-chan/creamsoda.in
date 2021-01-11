import axios from "axios";
import gql from "graphql-tag";

const works = gql`
  {
    worksCollection {
      items {
        description {
          json
        }
        thumbnailsCollection {
          items {
            height
            url
            width
          }
        }
        model {
          file {
            contentType
            fileName
            size
            url
          }
          positionX
          positionY
          positionZ
          rotateX
          rotateY
          rotateZ
          scaleX
          scaleY
          scaleZ
        }
        title
      }
    }
  }
`;

// Helper Functions

const graphql = async <T>(query: string) => {
  const { data } = await axios.post<T>(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE}/environments/${process.env.CONTENTFUL_ENVIRONMENT}`,
    { query },
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};
