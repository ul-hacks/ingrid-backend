use warp::{Filter, http::Request};
use std::collections::HashMap;
pub fn get_info(a: String) -> HashMap<&'static str,String>{
    println!("ehhe");
    let mut info = HashMap::new();
    info.insert("Hello","pp".to_string());
    info.insert("UX Design","hoho".to_string());
    return info;
    
} 