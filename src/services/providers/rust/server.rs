// use warp::{Filter};
pub mod github;
use std::net::TcpStream;
use std::io::prelude::*;
use std::net::TcpListener;

// #[tokio::main]
pub fn stuff(mut stream: TcpStream) {
    let mut buffer = [0; 1024];
    stream.read(&mut buffer).unwrap();

    println!("Request: {}", String::from_utf8_lossy(&buffer[..]));

    let response = "HTTP/1.1 200 OK\r\n\r\n";

    stream.write(response.as_bytes()).unwrap();
    stream.flush().unwrap();
    github::get_info("hello".to_string());
    // // GET /hello/warp => 200 OK with body "Hello, warp!"
    // let github = warp::path!("github" / String)
    //     .map(|username| github::get_info(username));
    // // let khanacademy = warp::path!();
    // let hello = warp::path!("hello" / String)
    //     .map(|name| format!("Hello, {}!", name));
    // warp::serve(github)
    //     .run(([127, 0, 0, 1], 8084))
    //     .await;
}