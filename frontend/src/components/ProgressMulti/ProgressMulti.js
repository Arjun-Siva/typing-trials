import ProgressBar from "../TrialsEngine/ProgressBar/ProgressBar";

const ProgressMulti = (props) => {
    // list of objects - {temp_id, name, progress}
    const progressList = props.progressList;

    return (
        <div>
            <b>Progresses:</b>
            <ul>
                {progressList.map(item => {
                    return <li key={item.temp_id}>
                        {item.nickname}:<ProgressBar progress={item.progress} />
                    </li>
                })}
            </ul>
        </div>
    )
}

export default ProgressMulti;