import path from "path"
import { createReadStream, statSync } from "fs"

const DownloadReport = (req,res) => {
    const {reportid} = req.params

    const __dirname = path.resolve();
    const reportDir = path.join(__dirname, "reports");

    try{
        const reportLocation = `${reportDir}/${reportid}.pdf`

        const file = createReadStream(reportLocation);
        const stat = statSync(reportLocation);
        res.setHeader('Content-Length', stat.size);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
        file.pipe(res);

    }catch(err){
        res.status(500)
        res.json({error:"failed to get the requested report",message:err})
        res.end()
    }
}

export default DownloadReport