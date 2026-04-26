import {formatPrice} from "@/lib/formatPrice";
import CourseDetailsIntro from "./_components/CourseDetailsIntro";
import CourseDetails from "./_components/CourseDetails";
import Testimonials from "./_components/Testimonials";
import RelatedCourses from "./_components/RelatedCourses";
import {getCourseDetails} from '@/queries/courses';

const SingleCoursePage = async ({params}) => {
    const {id} = await params;
    const course = await getCourseDetails(id);

    return (
        <>
            <CourseDetailsIntro/>

            <CourseDetails/>

            <Testimonials/>

            <RelatedCourses/>
        </>
    );
};

export default SingleCoursePage;
