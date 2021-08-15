<<<<<<< HEAD:src/services/providers/extensions-api/src/github.rs
use warp::{Filter, http::Request};
use std::collections::HashMap;
pub fn get_info(a: String) -> HashMap<&'static str,String>{
    println!("ehhe");
    let mut info = HashMap::new();
    info.insert("Hello","pp".to_string());
    info.insert("UX Design","hoho".to_string());
    return info;
    
} 
=======
pub fn get_info(a: String) -> String{
    println!("{}", a);
    return a;
}
>>>>>>> 380c360c5a249e189b8283ef6f5c7cf41411078a:src/services/providers/rust/server/github.rs
