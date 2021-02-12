module.exports = {
    name: 'voice-chat-recognition',
    description: 'This detects when someone joins discord voice chat',
    
    execute(client, oldMember, newMember) {
        const newUserChannel = newMember.channelID;
        //const oldUserChannel = oldMember.channelID;

        // Set the channel for the bot to send messages to: bot-test-commands
        const botTestCommandsID = '809620229885526046';

        // Dictionary of all the VC IDs
        const dictID = {
            'generalVC': '728393039474851877',
            'sinnersVC': '783130220013944873',
            'schoolWorkVC': '783057081589694516',
            'overwatchVC': '744719590747013180',
            'streamingVC': '729420378656604181',
            'smashVC': '728394091083202723',
            'degenVC': '734047189202108416',
            'animeVC': '728394152630550648',
            'creativeVC': '728394115150119004',
            'AFKVC': '732337262049624094'
        }
        
        console.log(newMember);
        //console.log(newMember.member.joinedTimestamp);

        if(newUserChannel === dictID['generalVC']) {
            client.channels.cache.get(botTestCommandsID).send(newMember.member.user.username + ' joined General VC!');
        }
        else if(newUserChannel === dictID['sinnersVC']) {
            client.channels.cache.get(botTestCommandsID).send(newMember.member.user.username + ' joined Fucking Sinners VC!');
        }
        else if(newUserChannel === dictID['schoolWorkVC']) {
            client.channels.cache.get(botTestCommandsID).send(newMember.member.user.username + ' joined School/Work VC!');
        }
        else if(newUserChannel === dictID['overwatchVC']) {
            client.channels.cache.get(botTestCommandsID).send(newMember.member.user.username + ' joined Overwatch VC!');
        }
        else if(newUserChannel === dictID['streamingVC']) {
            client.channels.cache.get(botTestCommandsID).send(newMember.member.user.username + ' joined Streaming VC!');
        }
        else if(newUserChannel === dictID['smashVC']) {
            client.channels.cache.get(botTestCommandsID).send(newMember.member.user.username + ' joined Smash VC!');
        }
        else if(newUserChannel === dictID['degenVC']) {
            client.channels.cache.get(botTestCommandsID).send(newMember.member.user.username + ' joined Degenerates VC!');
        }
        else if(newUserChannel === dictID['animeVC']) {
            client.channels.cache.get(botTestCommandsID).send(newMember.member.user.username + ' joined Anime VC!');
        }
        else if(newUserChannel === dictID['creativeVC']) {
            client.channels.cache.get(botTestCommandsID).send(newMember.member.user.username + ' joined Creative VC!');
        }
        else if(newUserChannel === dictID['AFKVC']) {
            client.channels.cache.get(botTestCommandsID).send(newMember.member.user.username + ' joined AFK VC!');
        }
    }
}