Search.setIndex({"docnames": ["00-preliminaries/preliminaries", "05-parallel/parallel", "10-software-engineering/software-engineering", "15-modern-c++/modern-cpp", "18-dpcpp/dpcpp", "25-devices/devices", "30-performance/performance", "40-going-distributed/distributed", "99-sandbox/issues", "index"], "filenames": ["00-preliminaries/preliminaries.rst", "05-parallel/parallel.rst", "10-software-engineering/software-engineering.rst", "15-modern-c++/modern-cpp.rst", "18-dpcpp/dpcpp.rst", "25-devices/devices.rst", "30-performance/performance.rst", "40-going-distributed/distributed.rst", "99-sandbox/issues.rst", "index.rst"], "titles": ["Preliminaries", "Parallel Programming Preliminaries", "Software Engineering", "Modern C++ as a Better C (and C++)", "Data-Parallel C++", "Selecting and Using Devices", "Performance", "Distributed Computing with OneAPI", "Issues", "Welcome to the UnoAPI Systems Modules"], "terms": {"thi": [0, 1, 2, 9], "i": [0, 1, 2, 3, 9], "an": [0, 1, 3], "about": [0, 1, 3], "book": [0, 1], "chapter": [0, 1], "all": [0, 1, 3], "inclus": [0, 1], "tenet": 0, "who": 0, "ar": [0, 1, 3, 9], "next": [0, 1], "gener": [0, 1, 2, 3], "research": 0, "softwar": [0, 1, 3, 9], "engin": [0, 3, 9], "want": [0, 1, 3], "consid": [0, 1], "hpc": 0, "career": 0, "most": [0, 1, 3], "graduat": 0, "drawn": 0, "modern": [0, 9], "web": 0, "develop": [0, 9], "data": [0, 3, 9], "scienc": 0, "machin": 0, "learn": [0, 3], "job": [0, 1], "while": [0, 1], "wonder": [0, 3], "lost": 0, "opportun": 0, "hip": 0, "languag": [0, 1, 2, 9], "design": [0, 1, 3], "improv": [0, 1], "how": [0, 1, 3, 8], "we": [0, 1, 3, 9], "solv": 0, "problem": [0, 1], "cool": 0, "offer": 0, "higher": [0, 1], "order": [0, 1], "think": [0, 3], "e": [0, 1, 3], "g": [0, 1, 3], "scala": 0, "go": [0, 1, 3], "rust": 0, "numer": [0, 1], "script": [0, 2], "But": [0, 1], "itself": [0, 1, 3], "still": [0, 1], "where": [0, 1], "els": [0, 1], "can": [0, 1, 3], "you": [0, 1, 3], "have": [0, 1, 3], "access": [0, 1], "so": [0, 1, 3], "mani": [0, 1, 3], "core": 0, "novel": 0, "architectur": 0, "The": [0, 1, 2, 9], "punt": 0, "c": [0, 9], "provid": [0, 1, 3], "acceler": 0, "know": [0, 1, 3], "comput": [0, 1, 9], "system": [0, 1, 3, 8], "like": [0, 1], "progress": 0, "embrac": 0, "two": [0, 1], "area": 0, "se": 0, "These": [0, 1, 3], "plan": 0, "parallel": [0, 9], "program": [0, 3], "principl": [0, 1], "environ": 0, "minimum": [0, 3], "friction": 0, "approach": [0, 1], "better": [0, 1, 9], "multicor": 0, "work": [0, 1, 3, 9], "devic": [0, 9], "distribut": [0, 1, 3, 8, 9], "perform": [0, 1, 3, 9], "evalut": 0, "being": [1, 3], "draft": [1, 3], "now": 1, "set": [1, 2, 3, 9], "expect": 1, "accordingli": 1, "approxim": 1, "lineag": [1, 3], "final": [1, 3], "track": 1, "wa": 1, "laid": 1, "java": 1, "thread": [1, 3], "network": 1, "A": [1, 3, 8], "discuss": 1, "must": 1, "begin": 1, "sequenti": [1, 3], "our": [1, 2, 3], "one": 1, "john": 1, "processor": 1, "fetch": [1, 9], "instruct": 1, "from": [1, 3, 8, 9], "oper": [1, 3], "write": [1, 3], "result": 1, "back": 1, "accomplish": 1, "make": [1, 3], "small": 1, "increment": 1, "chang": [1, 3], "global": 1, "reli": [1, 3], "sequenc": 1, "highli": 1, "process": [1, 3], "note": [1, 3], "current": [1, 3], "assum": [1, 3], "us": [1, 2, 3, 9], "assign": [1, 3], "statement": 1, "right": 1, "hand": 1, "side": 1, "left": 1, "variabl": [1, 9], "branch": 1, "In": [1, 3], "given": 1, "syntact": 1, "sugar": 1, "There": 1, "try": [1, 3], "speed": 1, "up": [1, 3], "thei": [1, 3], "inher": 1, "attempt": 1, "mai": [1, 3], "made": [1, 3], "sever": 1, "onc": 1, "super": 1, "scalar": 1, "give": 1, "onli": 1, "few": 1, "time": [1, 3, 9], "similarli": [1, 3], "difficult": 1, "gain": 1, "high": 1, "written": [1, 3], "without": [1, 2, 3], "do": [1, 3], "extens": 1, "rewrit": 1, "produc": 1, "wide": [1, 3], "he": 1, "classifi": 1, "respect": 1, "differ": [1, 3], "stream": 1, "same": 1, "hi": 1, "follow": [1, 2, 3], "sisd": 1, "singl": 1, "familiar": [1, 3], "address": 1, "mimd": 1, "pronounc": 1, "mim": 1, "dee": 1, "multipl": [1, 3], "multiprocessor": 1, "multicomput": 1, "subject": 1, "here": [1, 3, 8, 9], "own": [1, 3], "those": 1, "specifi": [1, 3], "To": [1, 3], "individu": 1, "synchron": 1, "commun": [1, 3], "each": [1, 3], "other": [1, 3], "simd": 1, "sim": 1, "typic": 1, "arrai": 1, "broadcast": 1, "number": [1, 3], "unit": [1, 9], "them": [1, 3], "appropri": [1, 3], "ha": [1, 3], "flow": 1, "entir": 1, "rather": 1, "than": 1, "element": 1, "hardwar": 1, "wai": [1, 3], "which": [1, 3], "some": [1, 3], "base": [1, 3], "test": [1, 9], "turn": 1, "off": [1, 2], "part": [1, 3], "let": [1, 3], "read": 1, "when": [1, 3], "finish": 1, "misd": 1, "It": [1, 3], "total": 1, "clear": 1, "what": [1, 3], "fit": 1, "categori": 1, "One": 1, "kind": 1, "would": [1, 3], "fail": 1, "safe": 1, "check": 1, "sure": 1, "ani": [1, 3], "failur": 1, "caught": 1, "anoth": [1, 3], "propos": 1, "pass": 1, "through": [1, 3], "over": 1, "divid": 1, "varieti": 1, "share": 1, "common": [1, 3], "unless": 1, "special": 1, "purpos": 1, "sort": 1, "map": 1, "actual": [1, 3], "space": 1, "signific": 1, "advantag": 1, "larg": [1, 3], "structur": [1, 3], "cooper": 1, "sinc": [1, 3], "store": 1, "updat": [1, 3], "cannot": 1, "instant": 1, "mean": 1, "reader": 1, "get": 1, "old": 1, "compon": [1, 3], "ones": 1, "state": 1, "consist": 1, "therefor": 1, "becom": [1, 3], "confus": 1, "inconsist": 1, "facil": 1, "coordin": [1, 3], "done": 1, "correctli": 1, "hard": 1, "build": [1, 3, 9], "switch": 1, "between": 1, "bottleneck": 1, "traffic": 1, "tend": 1, "expens": 1, "slow": 1, "particularli": 1, "uma": 1, "uniform": 1, "take": [1, 3], "amount": [1, 3], "locat": 1, "As": 1, "larger": 1, "physic": 1, "packag": [1, 3], "alon": 1, "dictat": 1, "further": 1, "smaller": 1, "version": [1, 2, 3], "more": [1, 3], "chip": 1, "ad": [1, 9], "slower": 1, "altern": [1, 3], "numa": 1, "nonuniform": 1, "attach": 1, "quickli": 1, "down": 1, "By": 1, "care": 1, "placement": 1, "rep": 1, "licat": 1, "subroutin": 1, "conveni": 1, "cheaper": 1, "reason": 1, "howev": 1, "programm": 1, "discov": 1, "even": [1, 3, 9], "copi": [1, 3], "local": [1, 3], "At": 1, "point": [1, 3], "code": [1, 3], "complex": 1, "less": [1, 3], "portabl": 1, "dm": 1, "much": 1, "easier": 1, "harder": [1, 3], "basic": [1, 9], "collect": 1, "call": 1, "node": 1, "major": 1, "messag": 1, "often": [1, 3], "requir": [1, 3], "redesign": 1, "port": 1, "send": 1, "For": 1, "happen": 1, "request": 1, "repli": 1, "arguabl": 1, "radic": 1, "shift": 1, "goe": 1, "root": 1, "On": 1, "import": [1, 3, 9], "entiti": 1, "manipul": 1, "therebi": 1, "embodi": 1, "both": 1, "although": 1, "within": 1, "level": 1, "convei": 1, "across": 1, "arriv": 1, "enabl": [1, 3], "henc": 1, "run": [1, 3], "usual": 1, "appli": 1, "insight": 1, "mechan": 1, "character": 1, "driven": 1, "repres": [1, 3], "counter": 1, "operand": 1, "avail": [1, 3], "paradigmat": 1, "valu": [1, 3], "token": 1, "interconnect": 1, "upon": 1, "term": 1, "present": [1, 3], "easili": 1, "built": [1, 3], "also": [1, 3], "possibl": [1, 3], "signal": 1, "whose": 1, "techniqu": 1, "handl": [1, 9], "wait": 1, "whereupon": 1, "sent": 1, "demand": 1, "exampl": [1, 2, 3, 9], "binari": 1, "its": [1, 3], "implement": [1, 3], "reduct": 1, "occur": 1, "function": [1, 3], "repeatedli": 1, "rewritten": 1, "until": 1, "solut": 1, "includ": [1, 2, 3, 8], "replac": 1, "bodi": 1, "paramet": [1, 3], "substitut": 1, "formal": 1, "intern": 1, "represent": 1, "string": [1, 3], "link": [1, 3], "togeth": 1, "pointer": [1, 3], "best": 1, "spread": 1, "chain": 1, "reduc": [1, 3], "sub": 1, "express": [1, 9], "contain": [1, 3], "neighbor": 1, "fall": 1, "boundari": 1, "pattern": 1, "atop": 1, "logic": 1, "activ": 1, "concurr": [1, 3], "aggreg": 1, "answer": 1, "defin": [1, 3, 8], "frac": 1, "t_1": 1, "t_n": 1, "algorithm": [1, 3], "n": [1, 3], "notic": 1, "thing": 1, "should": [1, 3], "faster": 1, "coher": 1, "cultur": 1, "metaphor": 1, "bigger": 1, "better1": 1, "though": 1, "smallest": 1, "suppos": 1, "unknown": 1, "quantiti": 1, "thu": 1, "case": 1, "math": 1, "simpli": [1, 3], "linear": 1, "inde": 1, "If": [1, 3], "could": 1, "evenli": 1, "among": 1, "complet": [1, 3], "1": [1, 2, 3], "unlik": 1, "initi": [1, 9], "file": [1, 3], "rest": 1, "examin": 1, "detail": 1, "probabl": 1, "extra": 1, "beyond": [1, 9], "moreov": 1, "known": 1, "d": [1, 3], "least": [1, 3], "good": [1, 3], "help": [1, 3], "achiev": 1, "practic": [1, 3], "gt": 1, "sometim": 1, "observ": 1, "cach": 1, "pipelin": 1, "plai": 1, "role": 1, "depth": 1, "first": [1, 3], "search": [1, 9], "might": 1, "translat": [1, 3], "breadth": 1, "spend": 1, "fruitless": 1, "wherea": 1, "path": [1, 3], "find": 1, "formula": 1, "show": [1, 3], "were": 1, "serial": 1, "shouldn": 1, "t": 1, "ntn": 1, "swap": 1, "neglig": 1, "measur": 1, "ratio": 1, "worst": 1, "calcul": 1, "long": 1, "That": [1, 3], "greater": 1, "equal": 1, "doe": [1, 3], "realli": 1, "deserv": 1, "titl": 1, "mere": 1, "envelop": 1, "conjectur": 1, "prove": 1, "assert": 1, "lower": 1, "fraction": 1, "f": [1, 3], "taken": 1, "upper": 1, "bound": 1, "equat": 1, "definit": 1, "break": 1, "tn": 1, "ft": 1, "appear": 1, "factor": [1, 3], "denomin": 1, "remov": 1, "lead": [1, 3], "involv": [1, 3], "infin": 1, "increas": 1, "folllow": 1, "lim_": 1, "x": [1, 3], "infti": 1, "flaw": 1, "behind": 1, "deal": [1, 3], "fix": 1, "size": 1, "question": 1, "massiv": 1, "paral": 1, "lel": 1, "weather": 1, "forecast": 1, "superimpos": 1, "mesh": 1, "onto": 1, "atmospher": 1, "pressur": 1, "tempera": 1, "ture": 1, "humid": 1, "etc": 1, "surround": 1, "interv": 1, "And": 1, "too": 1, "lose": 1, "grid": 1, "step": 1, "largest": 1, "allow": [1, 3], "reach": 1, "rephras": 1, "start": [1, 3], "r": [1, 3], "ran": 1, "interleav": 1, "slope": 1, "mulat": 1, "theoret": 1, "aspect": 1, "argument": [1, 9], "against": 1, "decreas": 1, "matric": 1, "multipli": 1, "out": 1, "o": 1, "grow": 1, "2": [1, 2, 3], "paralleliz": 1, "3": [1, 2, 3], "grain": 1, "loos": 1, "refer": [1, 3], "unbalanc": 1, "load": 1, "wast": 1, "overhead": 1, "eight": 1, "10": [1, 3], "independ": 1, "look": [1, 3], "six": 1, "2t": 1, "overal": [1, 3], "maximum": 1, "u": [1, 3], "100": 1, "four": [1, 3], "12": 1, "12t": 1, "13": 1, "13t": 1, "compar": 1, "3t": 1, "significantli": 1, "head": [1, 9], "destroi": [1, 3], "balanc": 1, "cutov": 1, "caus": 1, "sched": 1, "ul": 1, "0": [1, 2, 3], "7": 1, "11": [1, 2, 3], "064t": 1, "seven": 1, "percent": 1, "choos": 1, "folklor": 1, "suggest": 1, "millisecond": [1, 3], "300": 1, "400": 1, "experi": 1, "yourself": 1, "parameter": 1, "your": [1, 3], "user": [1, 3], "adequ": 1, "computa": 1, "tion": 1, "determin": 1, "probe": 1, "around": [1, 9], "inquir": 1, "unavail": 1, "lock": 1, "unlock": 1, "resourc": [1, 3], "proce": 1, "alloc": [1, 3], "unfair": 1, "pro": 1, "cess": 1, "delai": 1, "acquir": 1, "hold": [1, 3], "none": 1, "releas": [1, 2, 9], "been": [1, 3], "grant": 1, "condit": [1, 3], "mutual": 1, "exclus": 1, "possess": 1, "No": 1, "preemption": 1, "circular": 1, "exist": 1, "cycl": 1, "three": [1, 3], "detect": 1, "someth": 1, "cancel": 1, "free": 1, "presenc": 1, "monitor": 1, "effec": 1, "tive": 1, "act": 1, "proxi": 1, "avoid": [1, 3], "creat": [1, 3], "befor": 1, "whether": 1, "imposs": 1, "easiest": 1, "prevent": 1, "elimin": 1, "ascend": 1, "never": 1, "alreadi": [1, 3], "strang": 1, "littl": 1, "especi": [1, 3], "conquer": 1, "combinator": 1, "broken": 1, "num": 1, "ber": 1, "exce": 1, "detriment": 1, "kept": 1, "busi": 1, "anywai": 1, "storag": 1, "descrip": 1, "tax": 1, "enough": 1, "cre": 1, "ated": 1, "after": 1, "suffici": 1, "choic": 1, "static": 1, "dynam": [1, 3], "respons": 1, "addit": 1, "inform": 1, "oftentim": 1, "imprecis": 1, "dif": 1, "ferenc": 1, "interact": 1, "concern": 1, "secondli": 1, "won": 1, "queue": 1, "contend": 1, "edg": 1, "along": 1, "longer": 1, "simul": 1, "cosmo": 1, "cube": 1, "gravit": 1, "movement": 1, "mass": 1, "unfortun": 1, "vast": 1, "region": 1, "nearli": 1, "empti": 1, "cluster": 1, "galaxi": 1, "horribli": 1, "imbalanc": 1, "random": [1, 3], "sai": 1, "hash": 1, "Then": 1, "count": 1, "row": 1, "p": 1, "floor": 1, "remain": 1, "last": 1, "15": 1, "4": [1, 3], "domin": 1, "ceil": 1, "21": 1, "5": [1, 3], "five": 1, "underutil": 1, "easi": 1, "j": 1, "mod": 1, "zero": [1, 3], "2p": 1, "3p": 1, "block": [1, 3], "guarante": 1, "rang": [1, 3], "li": 1, "ui": 1, "min": 1, "me": 1, "sage": 1, "shorter": 1, "perimet": 1, "squar": 1, "rectangular": 1, "apart": 1, "impli": 1, "increasingli": 1, "benefit": 1, "remot": [1, 9], "object": [1, 3], "just": 1, "place": [1, 3], "consider": 1, "lai": 1, "mem": 1, "ori": 1, "option": [1, 2, 3], "asyn": 1, "chronou": 1, "particular": [1, 3], "literatur": 1, "devot": 1, "almost": 1, "np": 1, "rapidli": [1, 3], "doubl": [1, 3], "add": [1, 3], "input": 1, "modestli": 1, "sun": 1, "burn": 1, "seek": 1, "perfect": 1, "instead": [1, 2, 3], "solu": 1, "dure": 1, "execu": 1, "self": 1, "form": 1, "themselv": 1, "select": [1, 9], "partit": 1, "saw": 1, "applic": 1, "my_id": 1, "column": 1, "group": 1, "k": 1, "cessor": 1, "convert": 1, "indic": 1, "necessari": 1, "m": 1, "matrix": 1, "origin": [1, 3], "correspond": [1, 3], "simpl": [1, 3], "keep": [1, 3, 8], "index": [1, 9], "item": 1, "decrement": 1, "illustr": [1, 9], "c_lock": 1, "Of": 1, "cours": [1, 3], "constant": 1, "clearli": 1, "low": 1, "cmake_minimum_requir": [2, 3], "14": [2, 3], "23": 2, "project": [2, 3], "unoapi_dpcpp_exampl": 2, "descript": 2, "oneapi": [2, 3, 9], "sampl": 2, "cxx": 2, "cmake_cxx_standard": 2, "cmake_cxx_standard_requir": 2, "ON": 2, "cmake_cxx_extens": 2, "cmake_runtime_output_directori": 2, "cmake_binary_dir": 2, "bin": 2, "fetchcont": [2, 3], "fetchcontent_declar": [2, 3], "fmt": [2, 9], "git_repositori": [2, 3], "http": [2, 3], "com": [2, 3, 9], "fmtlib": [2, 3], "git": [2, 3], "git_tag": [2, 3], "8": [2, 3], "fetchcontent_makeavail": [2, 3], "lot": [2, 3], "compil": [2, 3], "error": [2, 3], "spdlog_fmt_extern": 2, "librari": [2, 3], "bundl": 2, "spdlog": [2, 9], "gabim": 2, "v1": [2, 3], "9": [2, 3], "scnlib": 2, "eliaskosunen": 2, "cli11": [2, 3], "cliutil": [2, 3], "v2": 2, "googl": [2, 3], "add_subdirectori": 2, "matrix_mul": 2, "montecarlo": 2, "wordcloud": 2, "technical_analysi": 2, "orient": 3, "oop": 3, "concept": 3, "topic": [3, 9], "worthi": 3, "explor": 3, "standard": 3, "pre": 3, "task": 3, "iter": 3, "effect": 3, "style": 3, "favor": 3, "stl": 3, "extern": [3, 8, 9], "whenev": 3, "templat": 3, "type": 3, "save": 3, "effort": 3, "duplic": 3, "well": 3, "emploi": 3, "smart": 3, "manag": 3, "memori": 3, "dealloc": 3, "prone": 3, "leak": 3, "unique_ptr": 3, "shared_ptr": 3, "weak_ptr": 3, "lambda": 3, "concis": 3, "anonym": 3, "indispens": 3, "come": 3, "sycl": 3, "new": 3, "introduc": 3, "transfer": 3, "effici": 3, "unnecessari": 3, "constructor": 3, "smeantic": 3, "deep": 3, "construct": 3, "mutex": 3, "mind": 3, "ot": 3, "model": 3, "evolv": 3, "recent": 3, "year": 3, "auto": 3, "constev": 3, "modul": 3, "maintain": 3, "greatli": 3, "clean": 3, "judici": 3, "except": 3, "runtim": 3, "catch": 3, "throw": 3, "said": 3, "tutori": 3, "tradit": 3, "profici": 3, "scalabl": 3, "past": 3, "need": 3, "understand": 3, "great": 3, "debut": 3, "late": 3, "1980": 3, "earli": 3, "1990": 3, "": [3, 9], "y": 3, "z": 3, "support": 3, "header": 3, "h": 3, "ifndef": 3, "point_h": 3, "public": 3, "x_": 3, "y_": 3, "z_": 3, "noexcept": 3, "std": 3, "exchang": 3, "return": 3, "accessor": 3, "privat": 3, "endif": 3, "member": 3, "default": 3, "iostream": 3, "int": 3, "main": 3, "p1": 3, "p2": 3, "p3": 3, "output": 3, "cout": 3, "endl": 3, "6": 3, "natur": 3, "util": 3, "cast": 3, "l": 3, "myclass": 3, "data_": 3, "destructor": 3, "delet": 3, "nullptr": 3, "b": 3, "anyth": 3, "_": 3, "end": 3, "underscor": 3, "distinguish": 3, "identifi": 3, "trail": 3, "organ": [3, 9], "discourag": 3, "altogeth": 3, "readabl": 3, "establish": 3, "adopt": 3, "recogn": 3, "guid": 3, "llvm": 3, "reorgan": 3, "struct": [3, 8], "lightweight": 3, "coord": 3, "scale": 3, "void": [3, 8], "put": 3, "point_exampl": 3, "rule": 3, "add_librari": 3, "interfac": 3, "target_include_directori": 3, "cmake_current_source_dir": 3, "execut": 3, "add_execut": 3, "cpp": 3, "target_link_librari": 3, "cmakelist": 3, "txt": 3, "target": 3, "depend": [3, 9], "sourc": [3, 8, 9], "directori": 3, "abov": 3, "repo": 3, "focus": 3, "narr": 3, "fairli": 3, "popular": 3, "notabl": 3, "date": 3, "hoar": 3, "csp": 3, "sleep": 3, "join": 3, "chrono": 3, "coroutin": 3, "vector": 3, "slept": 3, "sleepcoroutin": 3, "promis": 3, "promise_typ": 3, "get_return_object": 3, "handle_typ": 3, "from_promis": 3, "suspend_nev": 3, "initial_suspend": 3, "suspend_alwai": 3, "final_suspend": 3, "unhandled_except": 3, "termin": 3, "return_void": 3, "coroutine_handl": 3, "random_devic": 3, "rd": 3, "mt19937": 3, "gen": 3, "uniform_int_distribut": 3, "distr": 3, "1000": 3, "5000": 3, "sleep_tim": 3, "this_thread": 3, "sleep_for": 3, "run_sleep_coroutin": 3, "push_back": 3, "resum": 3, "25": 3, "size_t": 3, "default_number_of_trapezoid": 3, "bool": 3, "show_function_valu": 3, "fals": 3, "run_sequenti": 3, "number_of_trapezoid": 3, "20": [3, 9], "found": 3, "python": 3, "cmakefil": 3, "github": [3, 9], "usag": 3, "parametr": 3, "view": 3, "becaus": 3, "unoapi": 3, "framework": 3, "flag": 3, "cli": 3, "hpp": 3, "argc": 3, "char": [3, 8], "argv": 3, "app": 3, "42": 3, "add_opt": 3, "integ": 3, "float": 3, "71": 3, "true": 3, "add_flag": 3, "boolean": 3, "hello": 3, "world": 3, "pars": 3, "cli11_pars": 3, "print": 3, "macro": 3, "consol": 3, "insert": 3, "demonstr": 3, "ll": 3, "16": 3, "commandlineinterfaceexampl": 3, "download": 3, "configur": 3, "info": 3, "player": 3, "dart": 3, "number_of_play": 3, "number_of_dart": 3, "real": 3, "use_ranlux": 3, "ranlux": 3, "minstd": 3, "text": 8, "figur": 8, "folder": [8, 9], "wordlist_tailq_h": 8, "tailq_head": 8, "wordlist_t": 8, "wordentry_t": 8, "tailq_entri": 8, "entri": 8, "wordlist_add": 8, "head_ptr": 8, "word": 8, "wordlist_print": 8, "wordlist_delet": 8, "wordlist_init": 8, "intel": 9, "noth": 9, "readi": 9, "prime": 9, "preliminari": 9, "motiv": 9, "cmake": 9, "affect": 9, "dpc": 9, "tool": 9, "separ": 9, "viewpath": 9, "17": 9, "googletest": 9, "continu": 9, "integr": 9, "action": 9, "gitlab": 9, "overview": 9, "featur": 9, "class": 9, "move": 9, "semant": 9, "name": 9, "convent": 9, "co": 9, "routin": 9, "automat": 9, "const": 9, "constexpr": 9, "format": 9, "command": 9, "line": 9, "log": 9, "issu": 9, "repositori": 9, "loyolachicagobook": 9, "latest": 9, "page": 9}, "objects": {}, "objtypes": {}, "objnames": {}, "titleterms": {"preliminari": [0, 1], "motiv": 0, "topic": [0, 1], "parallel": [1, 4], "program": 1, "brief": 1, "histori": 1, "data": [1, 4], "vector": 1, "machin": 1, "crai": 1, "connect": 1, "think": 1, "systol": 1, "architectur": 1, "loop": 1, "fortran": 1, "c": [1, 2, 3, 4], "effort": 1, "cuda": 1, "openmp": 1, "oneapi": [1, 7], "concept": 1, "human": 1, "von": 1, "neumann": 1, "limit": 1, "flynn": 1, "": 1, "taxonomi": 1, "control": 1, "memori": 1, "speedup": 1, "v": 1, "effici": 1, "amdahl": 1, "law": 1, "scalabl": 1, "strong": 1, "weak": 1, "scale": 1, "new": 1, "granular": 1, "starvat": 1, "deadlock": 1, "flood": 1, "throttl": 1, "layout": 1, "latenc": 1, "schedul": 1, "need": 1, "understand": 1, "q": 1, "submit": 1, "task": 1, "graph": 1, "dataflow": 1, "execut": 1, "macro": 1, "softwar": 2, "engin": 2, "cmake": [2, 3], "basic": 2, "organ": 2, "variabl": [2, 3], "affect": 2, "work": 2, "dpc": 2, "tool": 2, "separ": 2, "build": 2, "from": 2, "sourc": 2, "viewpath": 2, "fetch": 2, "extern": 2, "depend": 2, "import": 2, "17": 2, "20": 2, "beyond": 2, "unit": 2, "test": 2, "googletest": 2, "continu": 2, "integr": 2, "github": 2, "action": 2, "gitlab": 2, "modern": 3, "better": 3, "overview": 3, "languag": 3, "featur": 3, "The": 3, "class": 3, "move": 3, "semant": 3, "name": 3, "convent": 3, "ad": 3, "thi": 3, "folder": 3, "co": 3, "routin": 3, "automat": 3, "const": 3, "constexpr": 3, "initi": 3, "express": 3, "format": 3, "fmt": 3, "command": 3, "line": 3, "argument": 3, "handl": 3, "log": 3, "spdlog": 3, "select": 5, "us": 5, "devic": 5, "perform": 6, "distribut": 7, "comput": 7, "issu": 8, "head": 8, "exampl": 8, "illustr": 8, "welcom": 9, "unoapi": 9, "system": 9, "modul": 9, "indic": 9, "tabl": 9}, "envversion": {"sphinx.domains.c": 2, "sphinx.domains.changeset": 1, "sphinx.domains.citation": 1, "sphinx.domains.cpp": 8, "sphinx.domains.index": 1, "sphinx.domains.javascript": 2, "sphinx.domains.math": 2, "sphinx.domains.python": 3, "sphinx.domains.rst": 2, "sphinx.domains.std": 2, "sphinx.ext.todo": 2, "sphinx": 57}, "alltitles": {"Preliminaries": [[0, "preliminaries"]], "Motivation": [[0, "motivation"]], "Topics": [[0, "topics"]], "Parallel Programming Preliminaries": [[1, "parallel-programming-preliminaries"]], "Brief History of Data Parallelism": [[1, "brief-history-of-data-parallelism"]], "Vector machines (Cray)": [[1, "vector-machines-cray"]], "Connection Machine (Thinking Machines)": [[1, "connection-machine-thinking-machines"]], "Systolic architectures": [[1, "systolic-architectures"]], "Loop parallelism in FORTRAN": [[1, "loop-parallelism-in-fortran"]], "C* and Data-Parallel C efforts": [[1, "c-and-data-parallel-c-efforts"]], "CUDA": [[1, "cuda"]], "OpenMP": [[1, "openmp"]], "oneAPI": [[1, "oneapi"]], "Parallel Concepts for Humans": [[1, "parallel-concepts-for-humans"]], "von Neumann machines and their limits": [[1, "von-neumann-machines-and-their-limits"]], "Flynn\u2019s taxonomy": [[1, "flynn-s-taxonomy"]], "Control-memory taxonomy": [[1, "control-memory-taxonomy"]], "Speedup vs. Efficiency": [[1, "speedup-vs-efficiency"]], "Amdahl\u2019s Law": [[1, "amdahls-law"]], "Scalability": [[1, "scalability"]], "Strong/Weak scaling [new topic]": [[1, "strong-weak-scaling-new-topic"]], "Granularity": [[1, "granularity"]], "starvation, deadlock": [[1, "starvation-deadlock"]], "Flooding/Throttling": [[1, "flooding-throttling"]], "Layout": [[1, "layout"]], "Latency": [[1, "latency"]], "Scheduling [needed for understanding q.submit()]": [[1, "scheduling-needed-for-understanding-q-submit"]], "task graphs / dataflow execution / macro-dataflow concept": [[1, "task-graphs-dataflow-execution-macro-dataflow-concept"]], "Software Engineering": [[2, "software-engineering"]], "Cmake": [[2, "cmake"]], "Basic organization of CMake": [[2, "basic-organization-of-cmake"]], "Variables that affect working with DPC++ tooling": [[2, "variables-that-affect-working-with-dpc-tooling"]], "Separating build from source (viewpathed building)": [[2, "separating-build-from-source-viewpathed-building"]], "Fetching external dependencies": [[2, "fetching-external-dependencies"]], "Important external dependencies for C++ 17, 20, and beyond": [[2, "important-external-dependencies-for-c-17-20-and-beyond"]], "Unit Testing with GoogleTest": [[2, "unit-testing-with-googletest"]], "Continuous Integration": [[2, "continuous-integration"]], "GitHub Actions": [[2, "github-actions"]], "GitLab?": [[2, "gitlab"]], "Modern C++ as a Better C (and C++)": [[3, "modern-c-as-a-better-c-and-c"]], "Overview of Modern C++": [[3, "overview-of-modern-c"]], "Language Features": [[3, "language-features"]], "The Modern C++ Class": [[3, "the-modern-c-class"]], "Move Semantics": [[3, "move-semantics"]], "Naming Conventions": [[3, "naming-conventions"]], "Adding this to a CMake folder": [[3, "adding-this-to-a-cmake-folder"]], "Co-routines": [[3, "co-routines"]], "Automatic variables": [[3, "automatic-variables"]], "const and constexpr": [[3, "const-and-constexpr"]], "initializer expressions": [[3, "initializer-expressions"]], "Format and fmt": [[3, "format-and-fmt"]], "command-line argument handling": [[3, "command-line-argument-handling"]], "logging - spdlog": [[3, "logging-spdlog"]], "Data-Parallel C++": [[4, "data-parallel-c"]], "Selecting and Using Devices": [[5, "selecting-and-using-devices"]], "Performance": [[6, "performance"]], "Distributed Computing with OneAPI": [[7, "distributed-computing-with-oneapi"]], "Issues": [[8, "issues"]], "Heading": [[8, "heading"]], "Examples": [[8, "examples"]], "Illustration": [[8, "illustration"]], "Welcome to the UnoAPI Systems Modules": [[9, "welcome-to-the-unoapi-systems-modules"]], "Indices and tables": [[9, "indices-and-tables"]]}, "indexentries": {}})