import { useEffect, useState } from "react"
import axios from 'axios'
import { useParams } from "react-router-dom"

const SubmitWork = () => {
    const [task, setTask] = useState([])
    const { courseId } = useParams()
    useEffect(() => {
        const submitTask = async () => {
            try {
                const response = await axios.post(`http://localhost:4000/task/${courseId}`)
                setTask(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        submitTask()
    }, [courseId])
    return (
        <div>
            <form>
                <input type="text" />
                <input type="text" />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default SubmitWork
