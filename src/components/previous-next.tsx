import { IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react"

export default function PreviousNext({ handleNext, handlePrevious, currentItem, data }) {

    return (
        <div className="toggle__next">
            <div>
                {currentItem > 1 && (
                    <Previous handlePrevious={handlePrevious} />


                )}
            </div>
            <div>
                {currentItem < data.length && (
                    <Next handleNext={handleNext} />

                )}
            </div>
        </div>
    )

}

function Next({ handleNext }) {

    return (
        <button onClick={handleNext}>
            <span>next</span>
            <IconChevronsRight color="#e76f51" />
        </button>
    )

}

function Previous({ handlePrevious }) {
    return (
        <button onClick={handlePrevious}>
            <IconChevronsLeft color="#e76f51" />
            <span>previous</span>
        </button>
    )

}