import { useAppContext } from "../Context/AppContext";
import { useMode, tokens } from "./Admin/theme"
const KeywordBox = ({ keyword }) => {

    //eslint-disable-next-line
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);
    const { mode } = useAppContext();

    const style = {
        color: mode === "dark-mode" ? colors.primary[100] : colors.primary[500],
        backgroundColor: mode === "dark-mode" ? colors.primary[900] : colors.primary[100],
        padding: "5px 8px",
        borderRadius: "5px",
        margin: "0 5px",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
    }
    return (
        <div className="keyword-box">
            <div style={style}>{keyword}</div>
        </div>
    )
}

export default KeywordBox;