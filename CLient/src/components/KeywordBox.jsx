import { useMode, tokens } from "./Admin/theme"
const KeywordBox = ({ keyword }) => {

    //eslint-disable-next-line
    const [theme, colorMode] = useMode();
    const colors=tokens(theme.palette.mode);

    const style = {
        color: localStorage.getItem("mode") === "dark-mode" ? colors.primary[100] : colors.primary[500],
        backgroundColor: localStorage.getItem("mode") === "dark-mode" ? colors.primary[900] : colors.primary[100],
        padding: "5px 10px",
        borderRadius: "5px",
        margin: "0 5px",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
    }
    return (
        <div className="keyword-box">
            <p style={style}>{keyword}</p>
        </div>
    )
}

export default KeywordBox;