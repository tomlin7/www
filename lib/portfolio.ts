import archive from "@/content/portfolio.json";
import resume from "@/content/current-resume.json";

// Keep the original archive intact; public pages use the reviewed current resume.
const portfolio = { ...archive, resume };
export default portfolio;
