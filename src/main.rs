use std::io::prelude::*;
use std::net::TcpListener;
use std::net::TcpStream;
use std::env;
mod services;

fn main() {
    let args: Vec<String> = env::args().collect();

    let servicename = &args[1];

    println!("{} up and running!", servicename);

    if servicename == "server" {
        let listener = TcpListener::bind("0.0.0.0:8080").unwrap();

        for stream in listener.incoming() {
            let stream = stream.unwrap();
            handle_server(stream);
        }
    }
    else if servicename == "providers" {
        let listener = TcpListener::bind("0.0.0.0:8084").unwrap();

        for stream in listener.incoming() {
            let stream = stream.unwrap();
            services::providers::rust::server::stuff(stream);
        }

    }
}

// todo: daniel + nithin, figure out rust modules lol
fn handle_server(mut stream: TcpStream) {
    let mut buffer = [0; 1024];

    stream.read(&mut buffer).unwrap();

    println!("Request: {}", String::from_utf8_lossy(&buffer[..]));

    let response = "HTTP/1.1 200 OK\r\n\r\n";

    stream.write(response.as_bytes()).unwrap();
    stream.flush().unwrap();
}
