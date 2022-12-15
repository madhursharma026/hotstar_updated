import { gql } from "@apollo/client";

export const FindMovieByIdSchema = gql`
  query findMovieById($movieId:Float!){
    findMovieById(movieId:$movieId){
      cat_id
      cover
      created_at
      description
      id
      imbd
      landscape
      mdb_posted
      position
      quality
      released
      server
      status
      tags
      title
      trailer
      trending_value
      updated_at
      files{
        artist
        created_at
        download_url
        file_name
        format
        position
        id
        premium
        server
        src
        status
        sub_title
        updated_at
      }
    }
  }
`;
