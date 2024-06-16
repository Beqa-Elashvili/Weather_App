import useGlobalProvider from "@src/Providers/useGlobalProvider";

export function ChangeFormat() {
  const { currentFormat, setCurrentFormat } = useGlobalProvider();

  const toggleFormat = useCallback(() => {
    if (currentFormat.Speed === Enam[0].Speed) {
      setCurrentFormat(Enam[1]);
      localStorage.setItem("Speed", "Mph");
    } else {
      setCurrentFormat(Enam[0]);
      localStorage.setItem("Speed", "Kpm");
    }
  }, [currentFormat]);

  let Enam = [
    { Speed: "kph", Temp: "C" },
    { Speed: "Mph", Temp: "F" },
  ];
}
