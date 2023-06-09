import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Url, UrlDocument} from "./url.schema";
import {Model} from "mongoose";
import * as CRC from "crc-32";

@Injectable()
export class UrlService {

    constructor(@InjectModel(Url.name) private urlModel: Model<UrlDocument>) {
    }

    private shrink(url: string) {
        return CRC.str(url).toString(16)
    }

    async create(url: string) {
        const createdUrl = new this.urlModel({url: url, shortenedUrl: this.shrink(url)});
        await createdUrl.save();
        return createdUrl.shortenedUrl;
    }

    async find(shortenedUrl: string) { //-3c666ac
        const url = await this.urlModel.findOne({shortenedUrl: shortenedUrl}).exec();
        return url.url;
    }
}
