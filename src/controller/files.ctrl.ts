import fs from "fs";

export class FileController {
    read(path:string): string {
        return fs.readFileSync(path, "utf8");
    }

    write(path:string, data: string): void {
        fs.writeFileSync(path, data);
    }

    delete(path: string): void {
        fs.unlinkSync(path);
    }
}
