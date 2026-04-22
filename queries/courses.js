import { Course } from "@/model/course-model";
export async function getCourses() {

    return await Course.find({});
}
