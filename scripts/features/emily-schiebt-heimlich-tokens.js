const EMILY_USER_ID = "ZoypzwFHSgFjsV4j";

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
      content: "<p>Emily schiebt schon wieder heimlich Tokens.</p>",
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
