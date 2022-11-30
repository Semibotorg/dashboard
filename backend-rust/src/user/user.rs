use rocket::serde::{json::Json};
#[path="../types/mod.rs"]
mod types;
use types::structs::{MessageResponse};

#[get("/user")]
pub fn user() -> Json<MessageResponse>{
    Json(MessageResponse {
        msg: String::from("User page")
    })
}