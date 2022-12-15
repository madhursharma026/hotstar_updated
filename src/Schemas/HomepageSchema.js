import { gql } from "@apollo/client";

export const homepageSchema = gql`
  query homepage($limit: Int!, $page: Int!) {
    homepage(limit: $limit, page: $page) {
      paginationInfo {
        currentPage
        pages
        perPage
        totalRecords
      }

      records {
        id
        created_at
        name
        position
        status
        updated_at

        movies(limit: 30, page: 1) {
          paginationInfo {
            currentPage
            pages
            perPage
            totalRecords
          }
          records {
            created_at
            id
            cat_id
            description
            title

            cover
            server
            files {
              id
              download_url
            }
          }
        }
      }
    }
  }
`;
