import styles from "./page.module.css";
import Grid from "@/components/Grid";
import {PathProvider} from "@/components/Path";
import {ModalProvider} from "@/components/Modal";
import {MetaProvider} from "@/components/Metadata";

export default function Home() {
    return (
        <div className={styles.page}>
            <header>
                <h1>
                    Pastas
                </h1>
            </header>
            <main className={styles.main}>
                <MetaProvider>
                    <PathProvider>
                        <ModalProvider>
                            <Grid/>
                        </ModalProvider>
                    </PathProvider>
                </MetaProvider>
            </main>
            <footer className={styles.footer}>
                Demonstração feita por Fernando Piancastelli
            </footer>
        </div>
    );
}
