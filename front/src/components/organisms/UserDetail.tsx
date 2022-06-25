// user detail infos like "좋아하는 철학자, 좋아하는 글, ..."
import LikedPhilosopher from "../molecules/LikedPhilosopher"
import LikedBooks from "../molecules/LikedBooks"
import SharedArticles from "../molecules/SharedArticles"
import WroteArticles from "../molecules/WroteArticles"
import AgreedTopics from "../molecules/AgreedTopics"
import OpposingTopics from "../molecules/OpposingTopics"

export default function UserDetail(){
    return <>
        <LikedPhilosopher />
        <LikedBooks />
        <SharedArticles />
        <WroteArticles />
        <AgreedTopics />
        <OpposingTopics />
    </>
}