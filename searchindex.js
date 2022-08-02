Search.setIndex({"docnames": ["00-preliminaries/preliminaries", "05-parallel/parallel", "10-software-engineering/software-engineering", "15-modern-c++/modern-cpp", "18-dpcpp/dpcpp", "25-devices/devices", "30-performance/performance", "40-going-distributed/distributed", "99-sandbox/issues", "index"], "filenames": ["00-preliminaries/preliminaries.rst", "05-parallel/parallel.rst", "10-software-engineering/software-engineering.rst", "15-modern-c++/modern-cpp.rst", "18-dpcpp/dpcpp.rst", "25-devices/devices.rst", "30-performance/performance.rst", "40-going-distributed/distributed.rst", "99-sandbox/issues.rst", "index.rst"], "titles": ["Preliminaries", "Parallel Programming Preliminaries", "Software Engineering", "Modern C++ as a Better C (and C++)", "Data-Parallel C++", "Selecting and Using Devices", "Performance", "Distributed Computing with OneAPI", "Issues", "Welcome to the UnoAPI Systems Modules"], "terms": {"thi": [0, 1, 2, 3, 9], "i": [0, 1, 2, 9], "an": [0, 1], "about": [0, 1], "book": [0, 1], "chapter": [0, 1], "all": [0, 1], "inclus": 0, "tenet": 0, "who": 0, "ar": [0, 1, 3, 9], "next": 0, "gener": [0, 2, 3], "research": 0, "softwar": [0, 1, 9], "engin": [0, 3, 9], "want": [0, 1], "consid": [0, 1], "hpc": 0, "career": 0, "most": [0, 1], "graduat": 0, "drawn": 0, "modern": [0, 9], "web": 0, "develop": [0, 9], "data": [0, 9], "scienc": 0, "machin": [0, 9], "learn": 0, "job": 0, "while": [0, 1], "wonder": 0, "lost": 0, "opportun": 0, "hip": 0, "languag": [0, 1, 2, 9], "design": [0, 1], "improv": 0, "how": [0, 1, 8], "we": [0, 1, 9], "solv": 0, "problem": [0, 1], "cool": 0, "offer": 0, "higher": 0, "order": 0, "think": [0, 9], "e": [0, 1], "g": [0, 1], "scala": 0, "go": [0, 1, 3], "rust": 0, "numer": 0, "script": [0, 2], "But": [0, 1], "itself": 0, "still": [0, 1], "where": [0, 1], "els": [0, 1], "can": [0, 1], "you": [0, 1], "have": [0, 1], "access": [0, 1], "so": [0, 1], "mani": [0, 1, 3], "core": 0, "novel": 0, "architectur": [0, 9], "The": [0, 1, 2], "punt": 0, "c": [0, 9], "provid": [0, 1], "acceler": 0, "know": [0, 1], "comput": [0, 1, 9], "system": [0, 8], "like": [0, 1], "progress": 0, "embrac": 0, "two": [0, 1], "area": 0, "se": 0, "These": [0, 1], "plan": 0, "parallel": [0, 9], "program": [0, 9], "principl": [0, 1], "environ": 0, "minimum": 0, "friction": 0, "approach": 0, "better": [0, 1, 9], "multicor": 0, "work": [0, 1, 9], "devic": [0, 9], "distribut": [0, 1, 3, 8, 9], "perform": [0, 1, 9], "evalut": 0, "being": 1, "draft": [1, 3], "now": 1, "set": [1, 2, 9], "expect": 1, "accordingli": 1, "approxim": 1, "lineag": 1, "final": 1, "track": 1, "wa": 1, "laid": 1, "java": 1, "thread": 1, "network": 1, "A": [1, 8], "discuss": 1, "must": 1, "begin": 1, "sequenti": 1, "our": [1, 2], "one": 1, "john": 1, "processor": 1, "fetch": [1, 9], "instruct": 1, "from": [1, 8, 9], "oper": 1, "write": 1, "result": 1, "back": 1, "accomplish": 1, "make": 1, "small": 1, "increment": 1, "chang": 1, "global": 1, "reli": 1, "sequenc": 1, "highli": 1, "process": 1, "note": 1, "current": 1, "assum": 1, "us": [1, 2, 3, 9], "assign": 1, "statement": 1, "right": 1, "hand": 1, "side": 1, "left": 1, "variabl": [1, 3, 9], "branch": 1, "In": 1, "given": 1, "syntact": 1, "sugar": 1, "There": 1, "try": 1, "speed": 1, "up": 1, "thei": 1, "inher": 1, "attempt": 1, "mai": 1, "made": 1, "sever": 1, "onc": 1, "super": 1, "scalar": 1, "give": 1, "onli": 1, "few": 1, "time": [1, 9], "similarli": 1, "difficult": 1, "gain": 1, "high": 1, "written": 1, "without": [1, 2], "do": 1, "extens": 1, "rewrit": 1, "produc": 1, "wide": 1, "he": 1, "classifi": 1, "respect": 1, "differ": 1, "stream": 1, "same": 1, "hi": 1, "follow": [1, 2], "sisd": 1, "singl": 1, "familiar": 1, "address": 1, "mimd": 1, "pronounc": 1, "mim": 1, "dee": 1, "multipl": 1, "multiprocessor": 1, "multicomput": 1, "subject": 1, "here": [1, 8, 9], "own": 1, "those": 1, "specifi": 1, "To": 1, "individu": 1, "synchron": 1, "commun": 1, "each": [1, 3], "other": 1, "simd": 1, "sim": 1, "typic": 1, "arrai": 1, "broadcast": 1, "number": [1, 3], "unit": [1, 9], "them": 1, "appropri": 1, "ha": 1, "flow": 1, "entir": 1, "rather": 1, "than": 1, "element": 1, "hardwar": 1, "wai": 1, "which": 1, "some": 1, "base": 1, "test": [1, 9], "turn": 1, "off": [1, 2], "part": 1, "let": 1, "read": 1, "when": 1, "finish": 1, "misd": 1, "It": 1, "total": 1, "clear": 1, "what": 1, "fit": 1, "categori": 1, "One": 1, "kind": 1, "would": 1, "fail": 1, "safe": 1, "check": 1, "sure": 1, "ani": 1, "failur": 1, "caught": 1, "anoth": 1, "propos": 1, "pass": 1, "through": 1, "over": 1, "divid": 1, "varieti": 1, "share": 1, "common": 1, "unless": 1, "special": 1, "purpos": 1, "sort": 1, "map": 1, "actual": 1, "space": 1, "signific": 1, "advantag": 1, "larg": 1, "structur": 1, "cooper": 1, "sinc": 1, "store": 1, "updat": 1, "cannot": 1, "instant": 1, "mean": 1, "reader": 1, "get": 1, "old": 1, "compon": 1, "ones": 1, "state": 1, "consist": 1, "therefor": 1, "becom": 1, "confus": 1, "inconsist": 1, "facil": 1, "coordin": 1, "done": 1, "correctli": 1, "hard": 1, "build": [1, 9], "switch": 1, "between": 1, "bottleneck": 1, "traffic": 1, "tend": 1, "expens": 1, "slow": 1, "particularli": 1, "uma": 1, "uniform": 1, "take": 1, "amount": 1, "locat": [1, 3], "As": 1, "larger": 1, "physic": 1, "packag": 1, "alon": 1, "dictat": 1, "further": 1, "smaller": 1, "version": [1, 2], "more": 1, "chip": 1, "ad": 1, "slower": 1, "altern": 1, "numa": 1, "nonuniform": 1, "attach": 1, "quickli": 1, "down": 1, "By": 1, "care": 1, "placement": 1, "rep": 1, "licat": 1, "subroutin": 1, "conveni": 1, "cheaper": 1, "reason": 1, "howev": 1, "programm": 1, "discov": 1, "even": [1, 9], "copi": 1, "local": 1, "At": 1, "point": 1, "code": 1, "complex": 1, "less": 1, "portabl": 1, "dm": 1, "much": 1, "easier": 1, "harder": 1, "basic": [1, 9], "collect": 1, "call": 1, "node": 1, "major": 1, "messag": 1, "often": 1, "requir": 1, "redesign": 1, "port": 1, "send": 1, "For": 1, "happen": 1, "request": 1, "repli": 1, "arguabl": 1, "radic": 1, "shift": 1, "goe": 1, "root": 1, "On": 1, "import": [1, 9], "entiti": 1, "manipul": 1, "therebi": 1, "embodi": 1, "both": 1, "although": 1, "within": 1, "level": 1, "convei": 1, "across": 1, "arriv": 1, "enabl": 1, "henc": 1, "run": 1, "usual": 1, "appli": 1, "insight": 1, "mechan": 1, "character": 1, "driven": 1, "repres": 1, "counter": 1, "operand": 1, "avail": 1, "paradigmat": 1, "valu": 1, "token": 1, "interconnect": 1, "upon": 1, "term": 1, "present": 1, "easili": 1, "built": 1, "also": 1, "possibl": 1, "signal": 1, "whose": 1, "techniqu": 1, "handl": [1, 9], "wait": 1, "whereupon": 1, "sent": 1, "demand": 1, "exampl": [1, 2, 9], "binari": 1, "its": 1, "implement": 1, "reduct": 1, "occur": 1, "function": 1, "repeatedli": 1, "rewritten": 1, "until": 1, "solut": 1, "includ": [1, 2, 3, 8], "replac": 1, "bodi": 1, "paramet": 1, "substitut": 1, "formal": 1, "intern": 1, "represent": 1, "string": [1, 3], "link": 1, "togeth": 1, "pointer": 1, "best": 1, "spread": 1, "chain": 1, "reduc": 1, "sub": 1, "express": [1, 3], "contain": 1, "neighbor": 1, "fall": 1, "boundari": 1, "pattern": 1, "atop": 1, "logic": 1, "activ": 1, "concurr": 1, "aggreg": 1, "answer": 1, "defin": [1, 8], "frac": 1, "t_1": 1, "t_n": 1, "linear": 1, "n": [1, 3], "upper": 1, "bound": 1, "t": 1, "f": 1, "1": [1, 2, 3], "simplifi": 1, "remov": 1, "infinit": 1, "lim_": 1, "x": [1, 3], "infti": 1, "scalabl": 1, "r": [1, 3], "equat": 1, "cmake_minimum_requir": 2, "3": 2, "14": 2, "23": 2, "project": 2, "unoapi_dpcpp_exampl": 2, "0": 2, "descript": 2, "oneapi": [2, 9], "sampl": 2, "cxx": 2, "cmake_cxx_standard": 2, "cmake_cxx_standard_requir": 2, "ON": 2, "cmake_cxx_extens": 2, "cmake_runtime_output_directori": 2, "cmake_binary_dir": 2, "bin": 2, "fetchcont": 2, "fetchcontent_declar": [2, 3], "fmt": [2, 9], "git_repositori": [2, 3], "http": [2, 3], "com": [2, 3, 9], "fmtlib": [2, 3], "git": [2, 3], "git_tag": [2, 3], "8": [2, 3], "fetchcontent_makeavail": [2, 3], "lot": 2, "compil": 2, "error": 2, "option": 2, "spdlog_fmt_extern": 2, "librari": [2, 9], "instead": [2, 3], "bundl": 2, "spdlog": [2, 9], "gabim": 2, "v1": 2, "9": 2, "2": 2, "scnlib": 2, "eliaskosunen": 2, "cli11": 2, "cliutil": 2, "v2": 2, "googl": 2, "releas": [2, 9], "11": 2, "add_subdirectori": 2, "matrix_mul": 2, "montecarlo": 2, "wordcloud": 2, "technical_analysi": 2, "automat": 3, "auto": 3, "25": 3, "const": 3, "constexpr": 3, "size_t": 3, "default_number_of_trapezoid": 3, "initi": [3, 9], "bool": 3, "show_function_valu": 3, "fals": 3, "run_sequenti": 3, "number_of_trapezoid": 3, "20": [3, 9], "support": 3, "format": 3, "found": 3, "python": 3, "add": 3, "your": 3, "cmakefil": 3, "github": [3, 9], "simpl": 3, "usag": 3, "cli": 3, "app": 3, "mont": 3, "carlo": 3, "algorithm": 3, "estim": 3, "pi": 3, "add_opt": 3, "p": 3, "player": 3, "number_of_play": 3, "dart": 3, "number_of_dart": 3, "per": 3, "add_flag": 3, "random": 3, "l": 3, "ranlux": 3, "use_ranlux": 3, "lcg": 3, "minstd": 3, "cli11_pars": 3, "argc": 3, "argv": 3, "info": 3, "throw": 3, "real": 3, "text": 8, "keep": 8, "figur": 8, "folder": 8, "sourc": [8, 9], "wordlist_tailq_h": 8, "tailq_head": 8, "wordlist_t": 8, "wordentry_t": 8, "struct": 8, "char": 8, "tailq_entri": 8, "entri": 8, "extern": [8, 9], "void": 8, "wordlist_add": 8, "head_ptr": 8, "word": 8, "wordlist_print": 8, "wordlist_delet": 8, "wordlist_init": 8, "around": 9, "intel": 9, "": 9, "noth": 9, "remot": 9, "readi": 9, "prime": 9, "preliminari": 9, "motiv": 9, "topic": 9, "brief": 9, "histori": 9, "vector": 9, "crai": 9, "connect": 9, "systol": 9, "loop": 9, "fortran": 9, "effort": 9, "cuda": 9, "openmp": 9, "concept": 9, "human": 9, "von": 9, "neumann": 9, "limit": 9, "flynn": 9, "taxonomi": 9, "control": 9, "memori": 9, "speedup": 9, "v": 9, "effici": 9, "strong": 9, "weak": 9, "scale": 9, "new": 9, "granular": 9, "starvat": 9, "deadlock": 9, "flood": 9, "throttl": 9, "latenc": 9, "schedul": 9, "need": 9, "understand": 9, "q": 9, "submit": 9, "task": 9, "graph": 9, "dataflow": 9, "execut": 9, "macro": 9, "cmake": 9, "organ": 9, "affect": 9, "dpc": 9, "tool": 9, "separ": 9, "viewpath": 9, "depend": 9, "17": 9, "beyond": 9, "googletest": 9, "continu": 9, "integr": 9, "action": 9, "gitlab": 9, "featur": 9, "command": 9, "line": 9, "argument": 9, "log": 9, "select": 9, "issu": 9, "head": 9, "illustr": 9, "repositori": 9, "loyolachicagobook": 9, "latest": 9, "index": 9, "search": 9, "page": 9}, "objects": {}, "objtypes": {}, "objnames": {}, "titleterms": {"preliminari": [0, 1], "motiv": 0, "topic": [0, 1], "parallel": [1, 4], "program": 1, "brief": 1, "histori": 1, "data": [1, 4], "vector": 1, "machin": 1, "crai": 1, "connect": 1, "think": 1, "systol": 1, "architectur": 1, "loop": 1, "fortran": 1, "c": [1, 2, 3, 4], "effort": 1, "cuda": 1, "openmp": 1, "oneapi": [1, 7], "concept": 1, "human": 1, "von": 1, "neumann": 1, "limit": 1, "flynn": 1, "": 1, "taxonomi": 1, "control": 1, "memori": 1, "speedup": 1, "v": 1, "effici": 1, "strong": 1, "weak": 1, "scale": 1, "new": 1, "granular": 1, "starvat": 1, "deadlock": 1, "flood": 1, "throttl": 1, "latenc": 1, "schedul": 1, "need": 1, "understand": 1, "q": 1, "submit": 1, "task": 1, "graph": 1, "dataflow": 1, "execut": 1, "macro": 1, "softwar": 2, "engin": 2, "cmake": 2, "basic": 2, "organ": 2, "variabl": 2, "affect": 2, "work": 2, "dpc": 2, "tool": 2, "separ": 2, "build": 2, "from": 2, "sourc": 2, "viewpath": 2, "fetch": 2, "extern": 2, "depend": 2, "import": 2, "17": 2, "20": 2, "beyond": 2, "unit": 2, "test": 2, "googletest": 2, "continu": 2, "integr": 2, "github": 2, "action": 2, "gitlab": 2, "modern": 3, "better": 3, "languag": 3, "featur": 3, "librari": 3, "fmt": 3, "command": 3, "line": 3, "argument": 3, "handl": 3, "log": 3, "spdlog": 3, "select": 5, "us": 5, "devic": 5, "perform": 6, "distribut": 7, "comput": 7, "issu": 8, "head": 8, "exampl": 8, "illustr": 8, "welcom": 9, "unoapi": 9, "system": 9, "modul": 9, "indic": 9, "tabl": 9}, "envversion": {"sphinx.domains.c": 2, "sphinx.domains.changeset": 1, "sphinx.domains.citation": 1, "sphinx.domains.cpp": 6, "sphinx.domains.index": 1, "sphinx.domains.javascript": 2, "sphinx.domains.math": 2, "sphinx.domains.python": 3, "sphinx.domains.rst": 2, "sphinx.domains.std": 2, "sphinx.ext.todo": 2, "sphinx": 56}})