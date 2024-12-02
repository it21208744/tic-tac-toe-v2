import { useContext } from 'react'
import { DataContext } from './LandingPage'
import * as XLSX from 'xlsx'
const AllResults = () => {
  const {
    fixationDuration,
    gazeShiftsCount,
    shadowScore,
    accuracy,
    timeElapsed,
    memoryScore,
    totalTime,
    errors,
    score,
  } = useContext(DataContext)

  const handleSubmit = (label) => {
    const data = [
      {
        Fixation_Duration: fixationDuration,
        Gaze_Shift_Count: gazeShiftsCount,
        Attention_Score: shadowScore,
        Memory_Recall_Accuracy: accuracy,
        Response_Time: timeElapsed,
        Memory_Score: memoryScore,
        Logical_Task_Completion_Time: totalTime,
        Logical_Task_Errors: errors,
        Logical_Score: score,
        AUTISM_LABEL: label,
      },
    ]

    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Shadow Game Results')
    XLSX.writeFile(workbook, 'Shadow_Game_Results.xlsx')
  }
  return (
    <div>
      <button className="submit-button" onClick={() => handleSubmit('ASD')}>
        AUTISM
      </button>

      <button className="submit-button" onClick={() => handleSubmit('TD')}>
        TD
      </button>
    </div>
  )
}
export default AllResults
