import { gql } from "@apollo/client";

export const FindMovieByTitleSchema = gql`
  query searchMovieByTitle($limit: Int!, $page: Int!, $search: String!) {
    searchMovieByTitle(limit: $limit, page: $page, search: $search) {
      paginationInfo {
        currentPage
        pages
        perPage
        totalRecords
      }

      records {
        id
        created_at
        # name
#        position
#        status
        updated_at
        cover
        description
#        released
        title
#        server
#        tags

        #       movies(limit: 30, page: 1) {
        #         paginationInfo {
        #           currentPage
        #           pages
        #           perPage
        #           totalRecords
        #         }
        #         records {
        #           created_at
        #           id
        #           cat_id
        #           description
        #           title

        #           cover
        #           server
        #           files {
        #             id
        #             download_url
        #           }
        #         }
        #       }
      }
    }
  }
`;
