import { gql } from "@apollo/client";

export const GenreDetail = gql`
  query genreDetail($genreId: Int!, $dataLimit: Int!) {
    genreDetail(genreId: $genreId) {
      id
      created_at
      name
      position
      status
      updated_at

      movies(limit: $dataLimit, page: 1) {
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
`;
