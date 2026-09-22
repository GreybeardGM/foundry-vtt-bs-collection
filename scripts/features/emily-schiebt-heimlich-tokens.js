const EMILY_USER_ID = "ZoypzwFHSgFjsV4j";
const EMILY_CAUGHT_IMAGE_URL =
  "https://assets.forge-vtt.com/6409126bc31700d40e3ac139/Bullshit%20Collection/Emily%20verschiebt%20Tokens.png";

let dialogOpen = false;

function isTokenMovement(changes) {
  return Object.hasOwn(changes, "x") || Object.hasOwn(changes, "y");
}

async function showCaughtDialog() {
  if (dialogOpen) return;

  dialogOpen = true;

  try {
    await foundry.applications.api.DialogV2.wait({
      window: {
        title: "Emily schiebt heimlich Tokens"
      },
      position: {
        width: 720
      },
      content: `
        <p>Emily schiebt schon wieder heimlich Tokens.</p>
        <img
          src="${EMILY_CAUGHT_IMAGE_URL}"
          alt="Emily verschiebt Tokens"
          style="display: block; width: 100%; height: auto; margin-top: 1rem;"
        >
      `,
      buttons: [
        {
          action: "apologize",
          label: "Tut mir leid!",
          default: true
        }
      ]
    });
  } finally {
    dialogOpen = false;
  }
}

export function registerEmilyMovesTokensFeature() {
  Hooks.on("updateToken", (_token, changes, _options, initiatingUserId) => {
    if (initiatingUserId !== EMILY_USER_ID) return;
    if (game.user.id !== EMILY_USER_ID) return;
    if (!isTokenMovement(changes)) return;

    void showCaughtDialog();
  });
}
