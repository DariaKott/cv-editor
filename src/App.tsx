import { Editor } from "./components/Editor/Editor";
import { Preview } from "./components/Preview/Preview";
import { useLocalStorageState } from "./shared/hooks/useLocalStorageState";
import "./App.css";

import type { ResumeSection } from "./types/resume";
import type { ProfileData } from "./components/ProfileForm/ProfileForm";

function App() {
  const [profile, setProfile] = useLocalStorageState<ProfileData>(
    "cv-profile",
    {
      name: "",
      position: "",
      email: "",
      phone: "",
      location: "",
    }
  );

  const [sections, setSections] = useLocalStorageState<ResumeSection[]>(
    "cv-sections",
    []
  );

  return (
    <div className="app-layout">
      <Editor
        profile={profile}
        setProfile={setProfile}
        sections={sections}
        setSections={setSections}
        defaultProfile={{
          name: "",
          position: "",
          email: "",
          phone: "",
          location: "",
        }}
        defaultSections={[]}
      />

      <Preview profile={profile} sections={sections} />
    </div>
  );
}

export default App;
