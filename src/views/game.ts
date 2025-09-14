
export default function game(card: number, size: number): string {
    let emoji: string[];
    let noOfBox: number;
    let root = '';
    const elements = [];
    switch (card) {
        case 0:
            emoji = ["😁", "😘", "😈", "🎃", "😡", "😎", "🥰", "🤯", "😂", "😛"];
            break;
        case 1:
            emoji = ["💐", "🌹", "🥀", "🌷", "🌺", "🌸", "🏵️", "🌻", "🌼", "💮"];
            break;
        case 2:
            emoji = ["🍓", "🍒", "🍎", "🍉", "🍑", "🍊", "🥭", "🍍", "🍌", "🍋"];
            break;
        case 3:
            emoji = ["❤️", "💘", "💝", "💖", "💗", "💓", "💞", "💕", "💔", "❣️"];
            break;
        case 4:
            emoji = ["🐵", "🦁", "🐯", "🐱", "🐶", "🐺", "🐻", "🐨", "🐼", "🐹"];
            break;
        case 5:
            emoji = ["🌼", "😘", "💘", "🐶", "🌺", "😎", "🌹", "🍒", "💔", "🐹"];
            break;
    }
    switch (size) {
        case 0:
            noOfBox = 6;
            root = "--no:3";
            break;
        case 1:
            noOfBox = 12;
            root = "--no:4;--row:8rem;";
            break;
        case 2:
            noOfBox = 20;
            root = "--no:5;--row:10rem;";
            break;
    }
    emoji.sort(() => {
        return Math.random() - 0.5;
    });
    for (let i = 0; i < noOfBox; i++) {
        elements.push(`
            <div class="card">${emoji[i % (noOfBox / 2)]}</div>
        `);
    }
    elements.sort(() => {
        return Math.random() - 0.5;
    });
    return (
        `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<!-------- BOX ICONT FOT EMOG -------->
	<link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
	<link rel="stylesheet" href="Game_style.css">
	<style>
        :root {
           ${root}
        }
       .GameScore {
            display: flex;
		.score {
			display: flex;
			flex-direction: column;
			align-items: center;
			color: wheat;
			padding-top: 10px;
			font-weight: 900;
		}
	</style>
</head>
<body>
	<div class="GameScore">
		<i class='bx bx-arrow-back' onclick="GotoHome()"></i>
		<div class="score player1">
			<span class="playerName">Player 1</span>
			<h1 class="value">0</h1>
		</div>
		<div class="score player2">
			<span class="playerName">Player 2</span>
			<h1 class="value">0</h1>
		</div>
		<i class='bx bx-reset' onclick="Reset()"></i>
	</div>
	<section>
		<main class="Game_Box">
            ${elements.join("")}
		</main>
	</section>
	<h1 class="asd"></h1>
</body>
<script>

</script>

</html>`
    )
}

// <script src="Game_script.js"></script>