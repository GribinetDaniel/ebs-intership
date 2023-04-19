import { Post } from "../types";
import { Header } from "../components/Header";
import { PostCard } from "../components/PostCard";
import { useQuery } from "react-query";
import { mainAxios } from "../utils";
import { Loading } from "../components/Loading";
import { ErrorPage } from "../components/ErrorPage/ErrorPage";
export function Homepage() {
    const { data, isLoading, error } = useQuery("posts", () => {
        return mainAxios.get("/posts");
    });

    consol.log(data?.data);
    return (
        <>
            {isLoading && <Loading />}
            {error && <ErrorPage />}
            {data && (
                <div className="content">
                    <Header />
                    <div className="home-page">
                        <div
                            className="row justify-content-center"
                            style={{ gap: "80px" }}
                        >
                            {data?.data.map((post: Post) => (
                                <PostCard {...post} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
