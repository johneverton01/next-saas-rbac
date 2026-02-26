import { ProjectForm } from '@/app/(dash)/org/[slug]/create-project/project-form'
import { InterceptedSheetContent } from '@/components/intercepted-sheet-content'
import { Sheet, SheetHeader } from '@/components/ui/sheet'

export default function CreateProject() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader>Create project</SheetHeader>
        <div className="p-4">
          <ProjectForm />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  )
}
