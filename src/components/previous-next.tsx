import { IconArrowBadgeLeft, IconArrowBadgeRight } from "@tabler/icons-react"

export default function PreviousNext() {

    return (
        <div className="toggle__next">
            <Previous />
            <Next />
        </div>
    )

}

function Next() {

    return (
        <button>
            <IconArrowBadgeRight />
        </button>
    )

}

function Previous() {
    return (
        <button>
            <IconArrowBadgeLeft />
        </button>
    )

}