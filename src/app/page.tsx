import styles from "./page.module.css";
import Grid from "@/components/Grid";
import {PathProvider} from "@/components/Path";
import {ModalProvider} from "@/components/Modal";

export default function Home() {
    return (
        <div className={styles.page}>
            <header>
                <h1>
                    Pastas
                </h1>
            </header>
            <main className={styles.main}>
                <PathProvider>
                    <ModalProvider>
                        <Grid/>
                    </ModalProvider>
                </PathProvider>
            </main>
            <footer className={styles.footer}>
                Demonstração feita por Fernando Piancastelli
            </footer>
        </div>
    );
}
