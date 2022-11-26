import { dirname, isAbsolute, join } from "path"

import { promises } from "fs"

interface IGetFilePath {
	path: string,
	name: string,
	extension: string
}
export class FileService {

	async isExists(path:string):Promise<boolean> {
		try {
			await promises.stat( path )
			return true
		} catch {
			return false
		}
	}

	public getFilePath( { path, name, extension }: IGetFilePath ):string {
		if ( !isAbsolute( path ) ) {
			path = join(`${__dirname}/${path}`)
		}
		return join(`${dirname(path)}/${name}.${extension}`)
	}

	async deleteFileIfExist( path: string ): Promise<void> {
		if ( await this.isExists( path ) ) {
			promises.unlink(path)
		}
	}
}