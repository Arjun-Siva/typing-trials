import ProgressBar from "../TrialsEngine/ProgressBar/ProgressBar";

const ProgressMulti = (props) => {
    // list of objects - {temp_id, name, progress}
    const progressList = props.progressList;

    return (
        <div>
            progresses
            <ul>
                {progressList.map(item => {
                    return <li key={item.temp_id}>
                        {item.nickname}:<ProgressBar color='red' progress={item.progress} />
                    </li>
                })}
            </ul>
        </div>
    )
}

export default ProgressMulti;