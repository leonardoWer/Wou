import "./BaseButton.css"

function BaseButton({title, type="bg", ...props}) {
    return (
        <button className={"base-button " + type}
                {...props}>
            {title}
        </button>
    )
}

export default BaseButton;