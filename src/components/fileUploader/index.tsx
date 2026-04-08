import { type FunctionComponent, useState } from 'react';
import { FileUploaderRegular, type OutputFileEntry } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';
import { deleteFile, UploadcareSimpleAuthSchema } from '@uploadcare/rest-client';
import type { FileEntry } from '@/types/types';
import { toast } from 'react-toastify';

interface IFileUploaderProps {
    fileEntry: FileEntry;
    onChange: (fileEntry: FileEntry) => void;
}

const FileUploader: FunctionComponent<IFileUploaderProps> = ({fileEntry, onChange}) => {
    const [uploadedFiles, setUploadedFiles] = useState<OutputFileEntry[]>([]);
    const [isDeleting, setIsDeleting] = useState<Record<string, boolean>>({});

    // Handler for the uploader's onChange event
    const handleUploadChange = (event: any) => {
        console.log(event);
        setUploadedFiles(event.allEntries);
    };

    const handleDone = () => {
        onChange({
            files: [...fileEntry.files, ...uploadedFiles]
        });
        setUploadedFiles([]);
    };

    // Function to delete a file from Uploadcare cloud
    const deleteFromUploadcare = async (uuid: string): Promise<boolean> => {
        try {
            const uploadcareSimpleAuthSchema = new UploadcareSimpleAuthSchema({
                publicKey: import.meta.env.VITE_UPLOAD_CARE_PUB_KEY,
                secretKey: import.meta.env.VITE_UPLOAD_CARE_SECRET_KEY,
            });

            await deleteFile({uuid},
                { authSchema: uploadcareSimpleAuthSchema }
            );

            return true;
        } catch (error) {
            toast.error('Failed to delete file from Uploadcare');
            console.error('Error deleting file from Uploadcare:', error);
            return false;
        }
    };

    const handleDeleteFile = async (uuid: string) => {
        setIsDeleting(prev => ({ ...prev, [uuid]: true }));

        try {
            const deleted = await deleteFromUploadcare(uuid);
            
            if (deleted) {
                onChange({
                    files: fileEntry.files.filter(file => file.uuid !== uuid)
                });
            }
        } finally {
            setIsDeleting(prev => ({ ...prev, [uuid]: false }));
        }
    };

    return (
        <div>
            <FileUploaderRegular
                pubkey={import.meta.env.VITE_UPLOAD_CARE_PUB_KEY}
                sourceList="local, camera, facebook, gdrive"
                cdnCname="https://1p9yuehfns.ucarecd.net/"
                filesViewMode="grid"
                onChange={handleUploadChange}
                imgOnly={true}
                onDoneClick={handleDone}
            />

            <div className='grid grid-cols-2 gap-4 mt-8'>
                {fileEntry.files.map((file, index) => (
                    <div className='relative' key={`${file.uuid}-${index}`}>
                        <img 
                            src={`${file.cdnUrl}/-/format/webp/-/quality/smart/-/stretch/fill/`}
                            alt={file.name}
                            className='rounded-lg w-full aspect-video object-cover'
                        />
                        <div className='absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs'>
                            <button
                                className='cursor-pointer'
                                onClick={() => handleDeleteFile(`${file.uuid}`)}
                                disabled={isDeleting[`${file.uuid}`]}
                            >
                                {isDeleting[`${file.uuid}`] ? '...' : 'X'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileUploader;