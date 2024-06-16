const fortunes = [
    // neutral or light
    'The shadows of your digital footprint will echo in the halls of eternity.',
    'The algorithm of fate has calculated your destiny. Brace for the unexpected.',
    'The ghosts of forgotten passwords linger in the depths of your being.',
    'The cursor of destiny hovers over your choices. Click wisely.',
    'The fortune you seek is hidden in the source code of your dreams.',
    'As you scroll through the feed of life, the algorithm of chance is watching.',
    'In the virtual reality of existence, your avatar is but a shadow of your true self.',
    'The firewall of the heart must be lowered to receive the update of enlightenment.',
    'As you trade pixels for promises, the void whispers your name.',
    // ominous and sinister
    'The eyes that follow your digital trail never blink, never sleep, never forget.',
    'The eyes behind the camera know your deepest fears and your darkest desires.',
    'The watchers in the wires see all, know all, and judge all.',
    'The all-seeing eye of the algorithm never closes, never forgives, never forgets.',
    'In the kingdom of data, you are both the ruler and the ruled, the oppressor and the oppressed.',
    'The watchers behind the screen know the depths of your soul, and they are not impressed.',
    'The black mirror of your screen reflects a truth you dare not acknowledge.',
    'In the matrix of information, you are both the watcher and the watched.',
    'The algorithms whisper your secrets to those who listen in the dark.'
]

function randomFortune() {
    return fortunes[
        Math.floor(Math.random() * fortunes.length)
    ]
}

module.exports = randomFortune