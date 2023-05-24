const parsedArgs = (originArgs: string[]) => {
    let args = [];
    for (let index = 0; originArgs[index]; index++) {
        const arg = originArgs[index];
        if (arg[0] == '"' || arg[0] == "'") {
            let end = "";
            const _index = index;
            for (let i = index; originArgs[i]; i++) {
                const arg = originArgs[i];
                if (arg[arg.length] == '"' || arg[arg.length] == "'") {
                    end = end + (i == _index ? "" : " ") + arg.slice(0, arg.length - 1);
                    break;
                } else {
                    end = end + (i == _index ? "" : " ") + arg;
                }
                index++;
            }
            if (end[end.length - 1] == '"' || end[end.length - 1] == "'") {
                end = end.substring(0, end.length - 1);
            }
            args.push(end.substring(1, end.length + 1));
        } else {
            args.push(arg);
        }
    }
	return args
};
export default parsedArgs;
