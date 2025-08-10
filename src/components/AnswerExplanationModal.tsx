import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { QuestionGroup } from "@/types";

export default function AnswerExplanationModal({
    open,
    onClose,
    group,
}: {
    open: boolean;
    onClose: () => void;
    group: QuestionGroup | null;
}) {
    if (!group) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent
                className="max-w-[80vw] w-[80vw] max-h-[80vh] h-[80vh] p-6 overflow-y-auto"
                aria-describedby={undefined}
            >
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Giải thích đáp án</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {group.imageUrl && (
                        <div className="flex justify-center">
                            <img
                                src={group.imageUrl}
                                alt="Question group"
                                className="rounded max-h-[300px] object-contain"
                            />
                        </div>
                    )}

                    {/* Audio */}
                    {group.audioUrl && (
                        <div>
                            <audio controls src={group.audioUrl} className="w-full" />
                        </div>
                    )}

                    {/* Passage */}
                    {group.passageText && (
                        <div className="bg-muted p-4 rounded text-base leading-relaxed">
                            <p>{group.passageText}</p>
                        </div>
                    )}

                    {/* Questions */}
                    <div className="space-y-6">
                        {group.questions.map((q, idx) => (
                            <div key={idx} className="border-t pt-4">
                                {q.questionText && (
                                    <p className="font-semibold mb-2 text-lg">
                                        {idx + 1}. {q.questionText}
                                    </p>
                                )}

                                <ul className="list-disc ml-6 space-y-1">
                                    {q.options.map((opt, oIdx) => (
                                        <li
                                            key={oIdx}
                                            className={
                                                opt.optionLetter === q.correctAnswerOption
                                                    ? "text-green-600 font-semibold"
                                                    : ""
                                            }
                                        >
                                            {opt.optionLetter}. {opt.optionText}
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-3">
                                    <p className="font-semibold">Giải thích:</p>
                                    <p className="leading-relaxed">{q.explanation || "Chưa có giải thích."}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}