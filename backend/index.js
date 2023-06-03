import { Hocuspocus } from "@hocuspocus/server";
//import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

//const supabase = createClient(process.env.SUPABASE_PROJECT_URL, process.env.SUPABASE_API_KEY);

// Configure the server …
const server = new Hocuspocus({
  port: 1234,
});

// … and run it!
server.listen();