import styles from "../FreeLancer.module.css"

export const CreateFreelancerButton = ({ freeLancer , navigate}) => {
    return (
        <button
            className={styles.buttonCreated}
            onClick={() => navigate("/app/freelancer/specs", {state:{freeLancer}} )}
        >
            Create New Freelancer
        </button>
    )
}