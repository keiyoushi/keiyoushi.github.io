declare namespace Goatcounter {
    interface CountVars {
        event?: boolean;
        path?: string;
        title?: string;
        referrer?: string;
    }

    interface Goatcounter {
        count: (vars: CountVars) => void;
    }
}

declare global {
    interface Window {
        goatcounter?: Goatcounter.Goatcounter;
    }
}

export {}
