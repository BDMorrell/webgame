import preventFormSubmission from "./preventFormSubmission";

function validateLeaveBlank(e: Event): void {
    const input = e.target as HTMLInputElement;
    let validity: string;
    if (input.value.length !== 0) {
        validity = "Clear out this field";
    } else {
        validity = "";
    }
    input.setCustomValidity(validity);
    input.reportValidity();
}

export default function createPlayerNameForm() {
    return <article class="gameForm">
        <form action="" method="get" autocomplete="off" on:submit={preventFormSubmission}>
            <hgroup class="heading">
                <h2><span class="corner">Form</span> 0001</h2>
                <p>Request for access to play this game</p>
            </hgroup>
            <div class="formLine">
                <div class="formField">
                    <label for="playername">Player Name</label>
                    <input type="text" name="playername" required />
                </div>
                <div class="formField">
                    <label for="leaveBlank">Leave Blank</label>
                    <input type="text" name="leaveBlank" on:change={validateLeaveBlank} />
                </div>
            </div>
            <input type="submit" />
        </form>
    </article>;
}
