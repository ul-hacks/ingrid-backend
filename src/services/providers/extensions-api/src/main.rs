// use warp::{Filter};
// mod github;

// async fn main() {

//     let github = warp::path!("github" / String)
//         .map(|username| warp::reply::json(&github::get_info(username)));
    
    
//     warp::serve(github)
//         .run(([127, 0, 0, 1], 3030))
//         .await;

// }
use std::collections::HashMap;
use reqwest::header::AUTHORIZATION;
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = reqwest::Client::new();
    let resp = client.post("http://httpbin.org/post")
    .header(AUTHORIZATION,"bearer0")
    .body("
    {
      user(login: \"$nithinmuthukumar\") {
        login
        avatarUrl
        followers {
          totalCount
        }
        following {
          totalCount
        }
        repositories {
          totalCount
        }
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
        }
        itemShowcase {
          items(first: 6) {
            edges {
              node {
                ... on Repository {
                  nameWithOwner
                  description
                  primaryLanguage {
                    name
                    color
                  }
                  forkCount
                  stargazerCount
                  url
                }
              }
            }
          }
        }
      }
    } 
  ")
    .send()
    .await?;
    println!("{:#?}", resp);
    println!("{}",AUTHORIZATION);
    Ok(())
}