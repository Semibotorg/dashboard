use rocket::serde::{Serialize};
#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
pub struct  MessageResponse {
    pub msg: String
}