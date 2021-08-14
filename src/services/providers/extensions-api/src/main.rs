use warp::{Filter};
mod github;
#[tokio::main]
async fn main() {
    // GET /hello/warp => 200 OK with body "Hello, warp!"
    let github = warp::path!("github" / String)
        .map(|username| github::get_info(username));
    // let khanacademy = warp::path!();
    let hello = warp::path!("hello" / String)
        .map(|name| format!("Hello, {}!", name));
    warp::serve(github)
        .run(([127, 0, 0, 1], 3030))
        .await;

}