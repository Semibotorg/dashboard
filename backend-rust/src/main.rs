#[macro_use] extern crate rocket;
use rocket::serde::{json::Json};
mod user;
mod types;
use types::structs::{MessageResponse};
use user::user::user as userRoute;
#[get("/")]
fn index() -> Json<MessageResponse> {
    Json(MessageResponse {
        msg: String::from("OK")
    })
}

#[launch]
fn rocket() -> _ {
    rocket::build()
    .mount("/", routes![index, userRoute])
}