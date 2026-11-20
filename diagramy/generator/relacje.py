from django.apps import apps
LOCAL = {"users","events","agreements","benefits","core","dispatch_requests","documents","foxcons_schedule","notes","notifications","shifts","telegram_events"}
T = {"ForeignKey":"N:1","OneToOneField":"1:1","ManyToManyField":"N:N"}
for m in apps.get_models():
    a = m._meta.app_label
    if a not in LOCAL or m.__name__.startswith("Historical"): continue
    print(f"MODEL|{a}|{m.__name__}")
    for f in m._meta.get_fields():
        if not f.is_relation or f.auto_created: continue
        t = f.related_model
        if t._meta.app_label not in LOCAL: continue
        od = getattr(f.remote_field, "on_delete", None)
        print(f"REL|{m.__name__}|{f.name}|{T[type(f).__name__]}|{t.__name__}|{od.__name__ if od else '-'}")
